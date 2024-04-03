import { type BatchedSQLDataSource } from '@nic-jennings/sql-datasource';

import {
  getDurationFilterQuery,
  getReleaseYearFilterQuery,
  getLikedFilterQuery,
} from '#utils';
import { TableNamesEnum } from '#enums';
import type { CoreDatamapperOptions } from '#types';

class CoreDatamapper {
  idsLoader: any;

  constructor(
    public readonly client: BatchedSQLDataSource['db'],
    public tableName: TableNamesEnum,
  ) {
    this.client = client;
    this.tableName = tableName;
  }

  // Normaly this method should be called in the constructor but this.tableName is not defined yet
  // So we will make this method disponible and let the datasource call it after each constructor
  init() {
    // This idsLoader allows to order all results by id, for every query request
    this.idsLoader = this.client.query
      .from(this.tableName)
      // TODO : Define types
      .batch(async (query, ids) => {
        const rows = await query.whereIn('id', ids);
        // TODO : Define types
        return ids.map((id) => rows.find((row: any) => row.id === id));
      });
  }

  // TODO : Define types
  async findByPk(id: number): Promise<any> {
    const row = await this.client.query.from(this.tableName).where({ id }).first();
    return row;
  }

  // = {} to accept default value if no args are passed
  // TODO : Define types
  async findAll(option: CoreDatamapperOptions = {}): Promise<any[]> {
    const query = this.client.query.from(this.tableName);
    const {
      email,
      filter,
      limit,
      userEncoded,
    } = option;

    if (email) {
      query.where({ email });
    }

    if (limit) {
      query.limit(limit);
    }

    if (filter) {
      const {
        duration_filter: durationFilter,
        release_year: releaseYear,
        name: title,
        liked,
      } = filter;

      if (durationFilter) {
        await getDurationFilterQuery(query, filter);
      }

      if (releaseYear) {
        await getReleaseYearFilterQuery(query, filter);
      }

      if (
        liked !== undefined
        && userEncoded
        && this.tableName === TableNamesEnum.SONG
      ) {
        await getLikedFilterQuery(query, userEncoded, liked);
      }

      if (
        // Only song and album tables have title column
        title && (
          this.tableName === TableNamesEnum.SONG || this.tableName === TableNamesEnum.ALBUM
        )) {
        query.whereILike('title', `${title}%`);
      }
    }

    const rowsFiltered = await query;
    return rowsFiltered;
  }

  // We have to add [] to the row with .returning('*') so it returns all we ask in the query
  // TODO : Define types
  async create(inputData: Record<string, any>): Promise<any> {
    const [row] = await this.client.query.from(this.tableName).insert(inputData).returning('*');
    return row;
  }

  // TODO : Define types
  async update(id: number, inputData: Record<string, any>): Promise<any> {
    const [row] = await this.client.query.from(this.tableName).update(inputData).where({ id }).returning('*');
    return row;
  }

  // TODO : Define types
  async delete(id: number): Promise<any> {
    const result = await this.client.query.from(this.tableName).where({ id }).del();
    return result;
  }

  // ids had to be an array of ids = array of numbers
  // TODO : Define types
  async deleteMultiple(ids: number[]): Promise<any> {
    const result = await this.client.query.from(this.tableName).whereIn('id', ids).del();
    return result;
  }

  async deleteMultipleAssociations(label: string, ids: number[]): Promise<any> {
    const result = await this.client.query.from(this.tableName).whereIn(label, ids).del();
    return result;
  }
}

export default CoreDatamapper;

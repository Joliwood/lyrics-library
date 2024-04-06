import { type BatchedLoader, type BatchedSQLDataSource } from '@nic-jennings/sql-datasource';

import {
  getDurationFilterQuery,
  getReleaseYearFilterQuery,
  getLikedFilterQuery,
  checkIfDeleted,
} from '#utils';
import { type AssociationsToDelete, TableNamesEnum } from '#enums';
import { type AllUpdateInputs, type AllCreateInputs, type AllFindAllArgs } from '#types';

class CoreDatamapper {
  idsLoader!: BatchedLoader<number, any>;

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
      .batch(async (query, ids) => {
        const rows = await query.whereIn('id', ids);
        return ids.map((id) => rows.find((row: any) => row.id === id));
      });
  }

  async findByPk<KQueryResult>(id: number): Promise<KQueryResult> {
    const row = await this.client.query
      .from(this.tableName)
      .where({ id })
      .first();

    return row;
  }

  async findAll<TQueryArgs extends AllFindAllArgs, KQueryResult>(
    args?: TQueryArgs & { userEncoded?: string },
  ): Promise<KQueryResult> {
    const query = this.client.query.from(this.tableName);

    const {
      filter,
      limit,
      userEncoded,
    } = args || {};

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
        await getDurationFilterQuery(query, durationFilter);
      }

      if (releaseYear) {
        await getReleaseYearFilterQuery(query, releaseYear);
      }

      if (
        liked != null
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

    const rowsFiltered = await query as KQueryResult;

    return rowsFiltered;
  }

  async create<TQueryArgs extends AllCreateInputs, KQueryResult>(
    input: TQueryArgs,
  ): Promise<KQueryResult> {
    const [result]: KQueryResult[] = await this.client.query
      .from(this.tableName)
      .insert(input)
      .returning('*');

    return result;
  }

  async update<TQueryArgs extends AllUpdateInputs, KQueryResult>(
    id: number,
    input: TQueryArgs,
  ): Promise<KQueryResult> {
    const [result]: KQueryResult[] = await this.client.query
    // WIP - Bug here for the update album
      .from(this.tableName)
      .update(input)
      .where({ id })
      .returning('*');

    return result;
  }

  async delete(id: number) {
    const result = await this.client.query
      .from(this.tableName)
      .where({ id })
      .del();

    return checkIfDeleted({ result });
  }

  async deleteMultiple(ids: number[]) {
    const result = await this.client.query
      .from(this.tableName)
      .whereIn('id', ids)
      .del();

    return checkIfDeleted({ result });
  }

  async deleteMultipleAssociations(label: AssociationsToDelete, ids: number[]) {
    const result = await this.client.query
      .from(this.tableName)
      .whereIn(label, ids)
      .del();

    return checkIfDeleted({ result });
  }
}

export default CoreDatamapper;

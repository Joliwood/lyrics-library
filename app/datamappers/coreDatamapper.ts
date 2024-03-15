import { convertFromMinuteToSecond, getIndexFromEnumValue } from '#utils';
import { DurationRange, ReleaseYear } from '#enums';
import type { CoreDatamapperOptions } from '#types';

class CoreDatamapper {
  // TODO : Precise tablenames with all tables of the DB
  tableName: string | undefined;

  // TODO : Define types
  idsLoader: any;

  // TODO : Define types
  client: any;

  // TODO : Precise client type
  constructor(client: any) {
    this.client = client;
  }

  // Normaly this method should be called in the constructor but this.tableName is not defined yet
  // So we will make this method disponible and let the datasource call it after each constructor
  init() {
    // This idsLoader allows to order all results by id, for every query request
    this.idsLoader = this.client.query
      .from(this.tableName)
      // TODO : Define types
      .batch(async (query: any, ids: number[]) => {
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

    if (option.email) {
      query.where({ email: option.email });
    }

    if (option.limit) {
      query.limit(option.limit);
    }

    if (option.filter?.duration_filter === DurationRange.ONE_MINUTE) {
      query.where('duration', '<=', convertFromMinuteToSecond(1));
    }

    if (option.filter?.duration_filter === DurationRange.ONE_TO_THREE_MINUTES) {
      query.whereBetween('duration', [convertFromMinuteToSecond(1), convertFromMinuteToSecond(3)]);
    }

    if (option.filter?.duration_filter === DurationRange.THREE_TO_FIVE_MINUTES) {
      query.whereBetween('duration', [convertFromMinuteToSecond(3), convertFromMinuteToSecond(5)]);
    }

    if (option.filter?.duration_filter === DurationRange.MORE_THAN_FIVE_MINUTES) {
      query.where('duration', '>=', convertFromMinuteToSecond(5));
    }

    if (option.filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_70)) {
      query.whereBetween('release_year', [ReleaseYear.YEAR_70, ReleaseYear.YEAR_80]);
    }

    if (option.filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_80)) {
      query.whereBetween('release_year', [ReleaseYear.YEAR_80, ReleaseYear.YEAR_90]);
    }

    if (option.filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_90)) {
      query.whereBetween('release_year', [ReleaseYear.YEAR_90, ReleaseYear.YEAR_2000]);
    }

    if (option.filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_2000)) {
      query.whereBetween('release_year', [ReleaseYear.YEAR_2000, ReleaseYear.YEAR_2010]);
    }

    if (option.filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_2010)) {
      query.whereBetween('release_year', [ReleaseYear.YEAR_2010, ReleaseYear.YEAR_2010 + 10]);
    }

    const rows = await query;
    return rows;
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
}

export default CoreDatamapper;

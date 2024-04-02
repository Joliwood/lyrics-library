import { type QueryBuilder, type Config } from 'knex';

export interface CoreDatamapperOptions {
  email?: string;
  limit?: number;
  userEncoded?: string;
  filter?: {
    duration_filter: DurationRange
    release_year: ReleaseYear
    name: string
    liked: boolean
  };
}

export interface LyricsDbDatasourceConfigType {
  knexConfig: Config;
}

export type ProfileJWT = {
  id: number,
  ip: string,
  iat: number,
  exp: number,
};

export type TableNames =
| 'artist'
| 'album'
| 'song'
| 'song_on_album'
| 'artist_like_song';

export interface IDsLoader {
  batch: (query: QueryBuilder, ids: number[]) => Promise<any[]>;
}

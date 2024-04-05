import { type IncomingMessage } from 'http';

import { type QueryBuilder } from 'knex';

import {
  type DurationRange,
  type ReleaseYear,
  type QueryAlbumsArgs,
  type QueryLoginArgs,
  type QuerySongsArgs,
  type InputMaybe,
} from './__generated_schemas__/graphql';

import type {
  AlbumDatamapper,
  ArtistDatamapper,
  ArtistLikeSongDatamapper,
  SongDatamapper,
  SongOnAlbumDatamapper,
} from '#datamappers';

export interface CoreDatamapperOptions {
  email?: string;
  limit: InputMaybe<number>;
  userEncoded?: string;
  filter?: {
    duration_filter: DurationRange
    release_year: ReleaseYear
    name: string
    liked: boolean
  };
}

export interface LyricsDbDatasourceConfigType {
  knexConfig: {
    client: string;
    connection: {
      user?: string;
      database?: string;
      password?: string;
      port?: string;
      host?: string;
      ssl: boolean;
    };
  }
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

export interface GraphQLContext {
  req: IncomingMessage;
  userEncoded?: string;
  dataSources: {
    lyricsdb: {
      albumDatamapper: AlbumDatamapper;
      artistDatamapper: ArtistDatamapper;
      artistLikeSongDatamapper: ArtistLikeSongDatamapper;
      songDatamapper: SongDatamapper;
      songOnAlbumDatamapper: SongOnAlbumDatamapper;
    };
  };
}

// export type DatamapperContext<TDatamapper =
// | album: GraphQLContext['dataSources']['lyricsdb']['albumDatamapper']
// ,> = TDatamapper;

// export type DatamapperContext<TDatamapper extends keyof
//   GraphQLContext['dataSources']['lyricsdb']> =
//   GraphQLContext['dataSources']['lyricsdb'][TDatamapper];

// export type AllFindAllArgs<TQueryArgs =
// | QueryAlbumsArgs
// | QueryLoginArgs['input']
// | QuerySongsArgs
// | undefined
// ,> = TQueryArgs;
//  & GraphQLContext['userEncoded'];

export type AllFindAllArgs<TQueryArgs = Partial<
& QueryAlbumsArgs
& QueryLoginArgs['input']
& QuerySongsArgs
> | undefined> = TQueryArgs;

// export type AllFindAllResult<KQueryResult =
// | QueryType['albums']
// ,> = Promise<KQueryResult[]>;

// export type AllFindAll = Artist[];
// export type AllFindById = Artist;
// export type AllCreate = Artist;
// export type AllUpdate = Artist;

export type FilterTypes = {
  duration_filter: DurationRange
  release_year: ReleaseYear
  name: string
  liked: boolean
};

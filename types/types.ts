import { type IncomingMessage } from 'http';

import {
  type AlbumUpdateInput,
  type ArtistLikeSong,
  type ArtistUpdateInput,
  type DurationRange,
  type QueryAlbumsArgs,
  type QueryLoginArgs,
  type QuerySongsArgs,
  type ReleaseYear,
  type SongCreateInput,
} from './__generated_schemas__/graphql';

import type {
  AlbumDatamapper,
  ArtistDatamapper,
  ArtistLikeSongDatamapper,
  SongDatamapper,
  SongOnAlbumDatamapper,
} from '#datamappers';

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

// --- Core datamapper generic methods --- //

export type AllFindAllArgs<TQueryArgs = Partial<
& QueryAlbumsArgs
& QueryLoginArgs['input']
& QuerySongsArgs
> | undefined> = TQueryArgs;

export type AllCreateInputs<TQueryArgs =
| ArtistLikeSong
| SongCreateInput
,> = TQueryArgs;

export type AllUpdateInputs<TQueryArgs = Partial<
| AlbumUpdateInput
| ArtistUpdateInput
>> = TQueryArgs;

// --- //

export type FilterTypes = {
  duration_filter: DurationRange
  liked: boolean
  name: string
  release_year: ReleaseYear
};

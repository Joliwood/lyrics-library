import type Knex from 'knex';

export type ArtistLikeSongRow = {
  artist_id: number,
  song_id: number,
};

export type SongOnAlbumRow = {
  album_id: number,
  song_id: number,
  position: number,
};

export type ArtistRow = {
  id: number,
  name: string,
  picture?: string,
  country?: string,
  // Sensitive data, only present in profile
  // email?: string,
  created_at: Date,
  updated_at?: Date,
};

export type AlbumRow = {
  id: number,
  title: string,
  release_year?: number,
  cover?: string,
  artist_id: number,
  created_at: Date,
  updated_at?: Date,
};

export type SongRow = {
  id: number,
  title: string,
  duration: number,
  cover?: string,
  lyrics?: string,
  artist_id: number,
  created_at: Date,
  updated_at?: Date,
};

export interface AlbumTable {
  id: number;
  title: string;
  release_year: Int
  cover?: string;
  artist_id: number;
}

export type LoginType = {
  expire_at: string,
  token: string,
};

export interface CoreDatamapperOptions {
  email?: string;
  limit?: number;
  filter?: SongFilterInput;
}

export interface LyricsDbDatasourceConfigType {
  knexConfig: Knex.Config;
}

// TODO : Define types
export type MutationResolversType = {
  updateArtist: (parent: any, args: any, context: any) => Promise<ArtistRow>;
  deleteArtist: (parent: any, args: any, context: any) => Promise<ArtistRow>;
  addAlbum: (parent: any, args: any, context: any) => Promise<AlbumRow>;
  updateAlbum: (parent: any, args: any, context: any) => Promise<AlbumRow>;
  deleteAlbum: (parent: any, args: any, context: any) => Promise<AlbumRow>;
  addSong: (parent: any, args: any, context: any) => Promise<SongRow>;
  // updateSong: (parent: any, args: any, context: any) => Promise<SongRow>;
  // deleteSong: (parent: any, args: any, context: any) => Promise<SongRow>;
  // createSongOnAlbum: (parent: any, args: any, context: any) => Promise<SongOnAlbumRow>;
  // deleteSongOnAlbum: (parent: any, args: any, context: any) => Promise<SongOnAlbumRow>;
};

// TODO : Define types
export type QueryResolversType = {
  artist: (parent: any, args: any, context: any) => Promise<ArtistRow>;
  artists: (parent: any, args: any, context: any) => Promise<ArtistRow[]>;
  album: (parent: any, args: any, context: any) => Promise<AlbumRow>;
  albums: (parent: any, args: any, context: any) => Promise<AlbumRow[]>;
  song: (parent: any, args: any, context: any) => Promise<SongRow>;
  songs: (parent: any, args: any, context: any) => Promise<SongRow[]>;
  // TODO : Define types
  login: (parent: any, args: any, context: any) => Promise<LoginType | any>;
  profile: (parent: any, args: any, context: any) => Promise<string | jwt.JwtPayload | null>;
  // songsOnAlbum: (parent: any, args: any, context: any) => Promise<SongOnAlbumRow[]>;
  // artistsLikeSong: (parent: any, args: any, context: any) => Promise<ArtistLikeSongRow[]>;
};

// TODO WIP : Take types when we will have generated types

enum Year {
  YEAR_70,
  YEAR_80,
  YEAR_90,
  YEAR_2000,
  YEAR_2010,
}

enum DurationRange {
  ONE_MINUTE,
  ONE_TO_THREE_MINUTES,
  THREE_TO_FIVE_MINUTES,
  MORE_THAN_FIVE_MINUTES,
}

type SongFilterInput = {
  durationFilter: DurationRange
  yearFilter: Year
};

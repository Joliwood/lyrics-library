import type Knex from 'knex';
// import { ReleaseYear, DurationRange } from './enums';

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
  filter?: FilterInput;
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
  deleteSongs: (parent: any, args: any, context: any) => Promise<boolean>;
  // createSongOnAlbum: (parent: any, args: any, context: any) => Promise<SongOnAlbumRow>;
  // deleteSongOnAlbum: (parent: any, args: any, context: any) => Promise<SongOnAlbumRow>;
};

// TODO WIP : Take types when we will have generated types

type FilterInput = {
  duration_filter: DurationRange
  release_year: ReleaseYear
};

export type ProfileJWT = {
  id: number,
  ip: string,
  iat: number,
  exp: number,
};

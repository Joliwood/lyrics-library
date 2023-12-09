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

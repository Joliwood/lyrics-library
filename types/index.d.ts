export type ArtistLikeSongRow = {
  artist_id: number, song_id: number
};

export type AlbumRows = {
  id: number,
  title: string,
  release_year?: number,
  cover?: string,
  artist_id: number,
  created_at: Date,
  updated_at?: Date,
};

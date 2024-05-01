import type { Song } from '../../types/__generated_schemas__/graphql';

import { CoreDatamapper } from '#datamappers';

class SongDatamapper extends CoreDatamapper {
  async findByAlbum(albumId: number): Promise<Song[]> {
    const songs: Song[] = await (
      this.client.query
        .from(this.tableName)
        .join('song_on_album', 'song.id', 'song_on_album.song_id')
        .where({ 'song_on_album.album_id': albumId })
    );
    return songs;
  }

  async findByArtist(artistId: number): Promise<Song[]> {
    const songs: Song[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    return songs;
  }
}

export default SongDatamapper;

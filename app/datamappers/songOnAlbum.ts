import { type SongOnAlbum } from '../../types/__generated_schemas__/graphql';

import { CoreDatamapper } from '#datamappers';

class SongOnAlbumDatamapper extends CoreDatamapper {
  async findBySong(songId: number): Promise<SongOnAlbum[]> {
    const songOnAlbums: SongOnAlbum[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id: songId })
    );
    return songOnAlbums;
  }

  async findByAlbum(albumId: number): Promise<SongOnAlbum[]> {
    const songOnAlbums: SongOnAlbum[] = await (
      this.client.query
        .from(this.tableName)
        .where({ album_id: albumId })
    );
    return songOnAlbums;
  }

  async deleteByAlbum(albumIds: number[]): Promise<boolean> {
    const result = await this.client.query.from(this.tableName).whereIn('album_id', albumIds).del();

    if (result) {
      return true;
    }

    return false;
  }
}

export default SongOnAlbumDatamapper;

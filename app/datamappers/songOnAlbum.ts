import { CoreDatamapper } from '#datamappers';
import { SongOnAlbum } from '../../types/__generated_schemas__/graphql';

class SongOnAlbumDatamapper extends CoreDatamapper {
  tableName = 'song_on_album';

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
}

export default SongOnAlbumDatamapper;

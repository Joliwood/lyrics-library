import { CoreDatamapper } from '#datamappers';
import type { ArtistLikeSong } from '../../types/__generated_schemas__/graphql';

class ArtistLikeSongDatamapper extends CoreDatamapper {
  tableName = 'artist_like_song';

  async findByArtist(artistId: number): Promise<ArtistLikeSong[]> {
    const artistLikeSong: ArtistLikeSong[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: artistId })
    );
    return artistLikeSong;
  }

  async findBySong(songId: number): Promise<ArtistLikeSong[]> {
    const artistLikeSong: ArtistLikeSong[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id: songId })
    );
    return artistLikeSong;
  }

  async countBySong(songId: number): Promise<number> {
    const artistLikeSong: ArtistLikeSong[] = await (
      this.client.query
        .from(this.tableName)
        .where({ song_id: songId })
    );
    return artistLikeSong.length;
  }

  async deleteByArtist(artistId: number): Promise<boolean> {
    const result = await this.client.query
      .from(this.tableName)
      .where({ artist_id: artistId })
      .del();
    return result;
  }

  async deleteBySongs(songIds: number[]): Promise<boolean> {
    const result = await this.client.query
      .from(this.tableName)
      .whereIn('song_id', songIds)
      .del();
    return result;
  }
}

export default ArtistLikeSongDatamapper;

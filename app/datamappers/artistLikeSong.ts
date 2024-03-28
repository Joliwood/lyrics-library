import type { ArtistLikeSong } from '../../types/__generated_schemas__/graphql';

import { CoreDatamapper } from '#datamappers';

class ArtistLikeSongDatamapper extends CoreDatamapper {
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

    if (result) {
      return true;
    }

    return false;
  }

  async deleteBySongs(songIds: number[]): Promise<boolean> {
    const result = await this.client.query
      .from(this.tableName)
      .whereIn('song_id', songIds)
      .del();

    if (result) {
      return true;
    }

    return false;
  }

  async unlikeSong(artistId: number, songId: number): Promise<boolean> {
    const result = await this.client.query
      .from(this.tableName)
      .where({ artist_id: artistId, song_id: songId })
      .del();

    if (result) {
      return true;
    }

    return false;
  }

  async isLiked({ userId, songId }: { userId: number, songId: number }): Promise<boolean> {
    const artistLikeSong: ArtistLikeSong[] = await (
      this.client.query
        .from(this.tableName)
        .where({ artist_id: userId, song_id: songId })
        .first()
    );

    if (!artistLikeSong) {
      return false;
    }

    return true;
  }
}

export default ArtistLikeSongDatamapper;

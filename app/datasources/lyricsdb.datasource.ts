/* eslint-disable @typescript-eslint/lines-between-class-members */
import { BatchedSQLDataSource, type BatchedSQLDataSourceProps } from '@nic-jennings/sql-datasource';

import {
  AlbumDatamapper,
  ArtistDatamapper,
  ArtistLikeSongDatamapper,
  SongDatamapper,
  SongOnAlbumDatamapper,
} from '#datamappers';
import { TableNamesEnum } from '#enums';

export default class LyricsDbDatasource extends BatchedSQLDataSource {
  albumDatamapper: AlbumDatamapper;
  artistDatamapper: ArtistDatamapper;
  artistLikeSongDatamapper: ArtistLikeSongDatamapper;
  songDatamapper: SongDatamapper;
  songOnAlbumDatamapper: SongOnAlbumDatamapper;

  constructor(
    config: BatchedSQLDataSourceProps,
  ) {
    super(config);
    const { db: client } = this;

    this.albumDatamapper = new AlbumDatamapper(
      client,
      TableNamesEnum.ALBUM,
    );

    this.artistDatamapper = new ArtistDatamapper(
      client,
      TableNamesEnum.ARTIST,
    );

    this.artistLikeSongDatamapper = new ArtistLikeSongDatamapper(
      client,
      TableNamesEnum.ARTIST_LIKE_SONG,
    );

    this.songDatamapper = new SongDatamapper(
      client,
      TableNamesEnum.SONG,
    );

    this.songOnAlbumDatamapper = new SongOnAlbumDatamapper(
      client,
      TableNamesEnum.SONG_ON_ALBUM,
    );

    this.initDatamappers();
  }

  private initDatamappers() {
    this.albumDatamapper.init();
    this.artistDatamapper.init();
    this.artistLikeSongDatamapper.init();
    this.songDatamapper.init();
    this.songOnAlbumDatamapper.init();
  }
}

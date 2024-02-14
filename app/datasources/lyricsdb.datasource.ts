import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import AlbumDatamapper from '../datamappers/album';
import ArtistDatamapper from '../datamappers/artist';
import SongDatamapper from '../datamappers/song';
import ArtistLikeSongDatamapper from '../datamappers/artistLikeSong';
import SongOnAlbumDatamapper from '../datamappers/songOnAlbum';

import type { CoreDatamapperOptions, LyricsDbDatasourceConfigType } from '../../types';

export default class LyricsDbDatasource extends BatchedSQLDataSource {
  albumDatamapper: AlbumDatamapper;

  artistDatamapper: ArtistDatamapper;

  songDatamapper: SongDatamapper;

  artistLikeSongDatamapper: ArtistLikeSongDatamapper;

  songOnAlbumDatamapper: SongOnAlbumDatamapper;

  // TODO : Define types
  constructor(config: CoreDatamapperOptions & LyricsDbDatasourceConfigType & { cache: any }) {
    super(config);
    this.albumDatamapper = new AlbumDatamapper(this.db);
    this.artistDatamapper = new ArtistDatamapper(this.db);
    this.songDatamapper = new SongDatamapper(this.db);
    this.artistLikeSongDatamapper = new ArtistLikeSongDatamapper(this.db);
    this.songOnAlbumDatamapper = new SongOnAlbumDatamapper(this.db);

    this.albumDatamapper.init();
    this.artistDatamapper.init();
    this.songDatamapper.init();
    this.artistLikeSongDatamapper.init();
    this.songOnAlbumDatamapper.init();
  }
}

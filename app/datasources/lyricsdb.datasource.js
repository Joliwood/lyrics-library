import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import AlbumDatamapper from '../datamappers/album.ts';
import ArtistDatamapper from '../datamappers/artist.js';
import SongDatamapper from '../datamappers/song.js';

export default class LyricsDbDatasource extends BatchedSQLDataSource {
  constructor(config) {
    super(config);
    this.albumDatamapper = new AlbumDatamapper(this.db);
    this.artistDatamapper = new ArtistDatamapper(this.db);
    this.songDatamapper = new SongDatamapper(this.db);

    this.albumDatamapper.init();
    this.artistDatamapper.init();
    this.songDatamapper.init();
  }
}

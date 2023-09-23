import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import AlbumDatamapper from '../datamappers/album.js';
import ArtistDatamapper from '../datamappers/artist.js';
import SongDatamapper from '../datamappers/song.js';

export default class OriginDatasource extends BatchedSQLDataSource {
  constructor(config) {
    super(config);
    this.album = new AlbumDatamapper(this.client);
    this.artist = new ArtistDatamapper(this.client);
    this.song = new SongDatamapper(this.client);
  }
}

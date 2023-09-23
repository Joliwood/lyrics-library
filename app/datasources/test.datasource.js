import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import AlbumDatamapper from '../datamappers/album';
import ArtistDatamapper from '../datamappers/artist';
import SongDatamapper from '../datamappers/song';

export default class TestDataSource extends BatchedSQLDataSource {
  constructor() {
    super();
    this.album = new AlbumDatamapper(this.client);

    this.artist = new ArtistDatamapper(this.client);
    this.song = new SongDatamapper(this.client);
  }
}

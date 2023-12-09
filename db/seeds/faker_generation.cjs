exports.seed = async (knex) => {
  // Use dynamic import() to load the ES Module
  const { fakerFR: faker } = await import('@faker-js/faker');

  // Deletes ALL existing datas
  // await knex('artist').truncate();
  // await knex('album').truncate();
  // await knex('song').truncate();
  // This solution doesn't work properly with PostgreSQL

  // Deletes ALL existing datas > alternative solution
  await knex.raw('TRUNCATE TABLE artist, album, song, artist_like_song, song_on_album CASCADE');

  const NB_ARTISTS = 50;
  const NB_ALBUMS = 100;
  const NB_SONGS = 200;

  // Generation of artists
  const artists = [];
  for (let i = 0; i < NB_ARTISTS; i += 1) {
    artists.push({
      name: faker.person.firstName(),
      picture: faker.internet.avatar(),
      country: faker.location.country(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  artists.push({
    name: 'admin',
    picture: faker.internet.avatar(),
    country: 'France',
    email: 'admin@gmail.com',
    password: 'admin',
  })
  await knex('artist').insert(artists);

  // Get the IDs of the inserted artists
  const artistRows = await knex.select('id').from('artist');
  const artistIds = artistRows.map((artist) => artist.id);

  // Generation of albums with random artist_id
  const albums = [];
  for (let i = 0; i < NB_ALBUMS; i += 1) {
    albums.push({
      title: faker.word.words(),
      cover: faker.image.url(),
      release_year: faker.number.int({ min: 1901, max: 2099 }),
      artist_id: artistIds[faker.number.int(
        { min: 0, max: artistIds.length - 1 },
      )],
    });
  }
  await knex('album').insert(albums);

  // Get the IDs of the inserted albums
  const albumRows = await knex.select('id').from('album');
  const albumIds = albumRows.map((album) => album.id);

  // Generation of artists
  const songs = [];
  for (let i = 0; i < NB_SONGS; i += 1) {
    songs.push({
      title: faker.music.songName(),
      duration: faker.number.int({ min: 30, max: 300 }),
      cover: faker.image.url(),
      lyrics: faker.lorem.text(),
      artist_id: faker.number.int({ min: 1, max: NB_ARTISTS }),
    });
  }
  await knex('song').insert(songs);

  // Generation of song_on_album
  const songOnAlbum = [];
  for (let i = 0; i < NB_ALBUMS; i += 1) {
    const selectedArtist = albums[i].artist_id;
    // Count the number of songs for the selected artist
    const songsArtistHas = await knex.select('id').from('song').where('artist_id', selectedArtist);

    // Extract the 'id' values from the query result
    const songIds = songsArtistHas.map((song) => song.id);
    const randomId = songIds[Math.floor(Math.random() * songIds.length)];

    // Rarely, randomId is undefined
    if (randomId) {
      for (let j = 0; j < faker.number.int({ min: 1, max: songIds.length }); j += 1) {
        songOnAlbum.push({
          album_id: albumIds[i],
          song_id: songIds[j],
          position: j + 1,
        });
      }
    }

  }
  await knex('song_on_album').insert(songOnAlbum);

  // Generation of artist_like_song
  const artistLikeSong = [];
  for (let i = 0; i < NB_SONGS; i += 1) {
    artistLikeSong.push({
      artist_id: faker.number.int({ min: 1, max: NB_ARTISTS }),
      song_id: i + 1,
    });
  }
  await knex('artist_like_song').insert(artistLikeSong);

  knex.destroy();
};

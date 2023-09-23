exports.seed = async (knex) => {
  // Use dynamic import() to load the ES Module
  const { fakerFR: faker } = await import('@faker-js/faker');

  // Deletes ALL existing datas
  // await knex('artist').truncate();
  // await knex('album').truncate();
  // await knex('song').truncate();
  // This solution doesn't work properly with PostgreSQL

  // Deletes ALL existing datas > alternative solution
  await knex.raw('TRUNCATE TABLE artist, album, song CASCADE');

  const NB_ARTISTS = 50;
  const NB_ALBUMS = 100;
  const NB_SONGS = 200;

  // Generation of artists
  const artists = [];
  for (let i = 0; i < NB_ARTISTS; i += 1) {
    artists.push({
      name: faker.person.firstName(),
      country: faker.location.country(),
    });
  }
  await knex('artist').insert(artists);

  // Get the IDs of the inserted artists
  const artistRows = await knex.select('id').from('artist');
  const artistIds = artistRows.map((artist) => artist.id);

  // Generation of albums with random artist_id
  const albums = [];
  for (let i = 0; i < NB_ALBUMS; i += 1) {
    albums.push({
      title: faker.word.words(),
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
      lyrics: faker.lorem.text(),
      album_id: albumIds[faker.number.int({ min: 0, max: albumIds.length - 1 })],
    });
  }
  await knex('song').insert(songs);

  knex.destroy();
};

exports.seed = async (knex) => {
  // Use dynamic import() to load the ES Module
  const { fakerFR: faker } = await import('@faker-js/faker');

  // Deletes ALL existing datas > alternative solution
  await knex.raw('TRUNCATE TABLE artist, album, song, artist_like_song, song_on_album CASCADE');

  const NB_ARTISTS = 500;
  const NB_ALBUMS = 2000;
  const NB_SONGS = 5000;

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
  });
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
      release_year: faker.number.int({ min: 1901, max: 2024 }),
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
      release_year: faker.number.int({ min: 1901, max: 2024 }),
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
    // eslint-disable-next-line no-await-in-loop
    const songsArtistHas = await knex.select('id').from('song').where('artist_id', selectedArtist);

    // Extract the 'id' values from the query result
    const songIds = songsArtistHas.map((song) => song.id);
    const maxSongsToAddToAlbum = songIds.length;
    const songOnAlbumIds = new Set();

    // Randomly select a number of songs to add to the album
    while (songOnAlbumIds.size < maxSongsToAddToAlbum) {
      const randomSongId = faker.number.int({ min: 1, max: maxSongsToAddToAlbum });
      songOnAlbumIds.add(randomSongId);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const songId of songOnAlbumIds) {
      songOnAlbum.push({
        album_id: albumIds[i],
        song_id: songId,
        position: songId,
      });
    }
  }
  await knex('song_on_album').insert(songOnAlbum);

  // Generation of artist_like_song
  const artistLikeSong = [];

  for (let i = 0; i < NB_ARTISTS; i += 1) {
    const nbOfSongTolike = faker.number.int({ min: 1, max: 20 });
    const songIds = new Set();
    while (songIds.size < nbOfSongTolike) {
      const randomSongId = faker.number.int({ min: 1, max: NB_SONGS });
      songIds.add(randomSongId);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const songId of songIds) {
      artistLikeSong.push({
        artist_id: artistIds[i],
        song_id: songId,
      });
    }
  }

  await knex('artist_like_song').insert(artistLikeSong);

  knex.destroy();
};

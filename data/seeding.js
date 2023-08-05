import '../app/helpers/env.loader.js';
import { fakerFR as faker } from '@faker-js/faker';
// import debugModule from 'debug';

import db from '../app/db/pg.js';

// const debug = debugModule('seeding');

db.queryCount = 0;

const NB_ARTISTS = 50;
const NB_ALBUMS = 100;
const NB_SONGS = 200;
// const NB_GENRES = 2;

// Usefull function if we have ' in the SQL query
function pgQuoteEscape(row) {
  const newRow = {};
  Object.entries(row).forEach(([prop, value]) => {
    if (typeof value !== 'string') {
      newRow[prop] = value;
      return;
    }
    newRow[prop] = value.replaceAll("'", "''");
  });
  return newRow;
}

// Artits faker generation
function generateArtists(nbArtists) {
  const artists = [];
  for (let iArtist = 0; iArtist < nbArtists; iArtist += 1) {
    const artist = {
      name: faker.person.firstName(),
      country: faker.location.country(),
    };
    artists.push(artist);
  }
  return artists;
}

async function insertArtists(artists) {
  await db.query('TRUNCATE TABLE "artist" RESTART IDENTITY CASCADE');
  const artistValues = artists.map((artist) => `(
            '${artist.name}',
            '${artist.country}'
        )`);

  const queryStr = `
             INSERT INTO "artist"
             (
                 "name",
                 "country"
             )
             VALUES
             ${artistValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

// Albums faker generation
function generateAlbums(nbAlbums, artistIds) {
  const albums = [];
  for (let i = 0; i < nbAlbums; i += 1) {
    const album = {
      title: faker.word.words(),
      release_year: faker.number.int({ min: 1901, max: 2099 }),
      artist_id: artistIds[faker.number.int({ min: 0, max: artistIds.length - 1 })],
    };
    albums.push(album);
  }
  return albums;
}

async function insertAlbums(albums) {
  await db.query('TRUNCATE TABLE "album" RESTART IDENTITY CASCADE');
  const albumValues = albums.map((album) => {
    const newCookingStyle = pgQuoteEscape(album);
    return (
      `(
        '${newCookingStyle.title}',
        '${newCookingStyle.release_year}',
        '${newCookingStyle.artist_id}'
    )`
    );
  });
  const queryStr = `
             INSERT INTO "album"
             (
                 "title",
                 "release_year",
                 "artist_id"
             )
             VALUES
             ${albumValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

function generateSongs(nbSongs, albumIds) {
  const songs = [];
  for (let i = 0; i < nbSongs; i += 1) {
    const song = {
      title: faker.music.songName(),
      duration: faker.number.int({ min: 30, max: 300 }),
      lyrics: faker.lorem.text(),
      album_id: albumIds[faker.number.int({ min: 0, max: albumIds.length - 1 })],
    };
    songs.push(song);
  }
  return songs;
}

// Songs faker generation
async function insertSongs(songs) {
  await db.query('TRUNCATE TABLE "song" RESTART IDENTITY CASCADE');
  const songValues = songs.map((song) => {
    const newCookingStyle = pgQuoteEscape(song);
    return `(
      '${newCookingStyle.title}',
      '${newCookingStyle.duration}',
      '${newCookingStyle.lyrics}',
      '${newCookingStyle.album_id}'
  )`;
  });
  const queryStr = `
             INSERT INTO "song"
             (
                 "title",
                 "duration",
                 "lyrics",
                 "album_id"
             )
             VALUES
             ${songValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

(async () => {
  const artists = generateArtists(NB_ARTISTS);
  const insertedArtists = await insertArtists(artists);
  // WIP // await insertArtists(artists);
  // WIP // debug(`${insertedArtists.length} artists inserted`);
  const artistIds = insertedArtists.map((artist) => artist.id);

  const albums = await generateAlbums(NB_ALBUMS, artistIds);
  const insertedAlbums = await insertAlbums(albums);
  // await insertAlbums(albums);
  // WIP // debug(`${insertedAlbums.length} albums inserted`);
  const albumIds = insertedAlbums.map((album) => album.id);

  const songs = await generateSongs(NB_SONGS, albumIds);
  // WIP // const insertedSongs = await insertSongs(songs);
  await insertSongs(songs);
  // WIP // debug(`${insertedSongs.length} songs inserted`);

  db.originalClient.end();
})();

import '../app/helpers/env.loader.js';
import { Faker } from '@faker-js/faker';
import debugModule from 'debug';

import db from '../app/db/pg.js';

const debug = debugModule('seeding');

db.queryCount = 0;

const NB_ARTISTS = 5;
const NB_ALBUMS = 10;
const NB_SONGS = 20;
const NB_GENRES = 2;

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

function generateArtists(nbArtists) {
  const artists = [];
  for (let i = 0; i < nbArtists; i += 1) {
    const artist = {
      name: new Faker({ locale: 'fr' }).name.firstName(),
    };
    artists.push(artist);
  }
  return artists;
}

async function insertArtists(artists) {
  await db.query('TRUNCATE TABLE "artist" RESTART IDENTITY CASCADE');
  const artistValues = artists.map((artist) => {
    const newArtist = pgQuoteEscape(artist);
    return `(
            '${newArtist.name}',
            '${newArtist.country}'
        )`;
  });

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

function generateGenres(nbGenres) {
  const genres = [];
  for (let i = 0; i < nbGenres; i += 1) {
    const genre = {
      label: new Faker({ locale: 'fr' }).address.country(),
    };
    genres.push(genre);
  }
  return genres;
}

async function insertGenres(genres) {
  await db.query('TRUNCATE TABLE "genre" RESTART IDENTITY CASCADE');
  const genresValues = genres.map((genre) => {
    const newGenre = pgQuoteEscape(genre);
    return `(
            '${newGenre.label}'
        )`;
  });

  const queryStr = `
             INSERT INTO "genre"
             (
                 "label"
             )
             VALUES
             ${genresValues}
             RETURNING id
     `;
  const result = await db.query(queryStr);
  return result.rows;
}

function generateAlbums(nbAlbums, artistIds) {
  const albums = [];
  for (let i = 0; i < nbAlbums; i += 1) {
    let title = new Faker({ locale: 'fr' }).name.firstName();
    // eslint-disable-next-line no-loop-func
    while (albums.find((album) => album.title === title)) {
      title = new Faker({ locale: 'fr' }).name.firstName();
    }

    const album = {
      title,
      release_year: new Faker({ locale: 'fr' }).datatype.number({ min: 1900, max: 2023 }),
      artist_id: artistIds[new Faker({ locale: 'fr' }).datatype.number({ min: 0, max: artistIds.length - 1 })],
    };
    albums.push(album);
  }
  return albums;
}

async function insertAlbums(albums) {
  await db.query('TRUNCATE TABLE "album" RESTART IDENTITY CASCADE');
  const albumValues = albums.map((album) => {
    const newAlbum = pgQuoteEscape(album);
    return `(
            '${newAlbum.title}',
            ${newAlbum.release_year},
            ${newAlbum.artist_id}
        )`;
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
    let title = `${new Faker({ locale: 'fr' }).name.firstName()} ${new Faker({ locale: 'fr' }).name.suffix()}`;
    // eslint-disable-next-line no-loop-func
    while (songs.find((song) => song.title === title)) {
      title = `${new Faker({ locale: 'fr' }).name.firstName()} ${new Faker({ locale: 'fr' }).name.suffix()}`;
    }
    const song = {
      title,
      duration: new Faker({ locale: 'fr' }).datatype.number({ min: 60, max: 600 }), // In seconds
      lyrics: new Faker({ locale: 'fr' }).lorem.paragraph(),
      album_id: albumIds[new Faker({ locale: 'fr' }).datatype.number({ min: 0, max: albumIds.length - 1 })],
    };
    songs.push(song);
  }
  return songs;
}

async function insertSongs(songs) {
  await db.query('TRUNCATE TABLE "song" RESTART IDENTITY CASCADE');
  const songValues = songs.map((song) => {
    const newSong = pgQuoteEscape(song);
    return `(
            '${newSong.title}',
            ${newSong.duration},
            '${newSong.lyrics}',
            ${newSong.album_id}
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
  /**
   * Générations d'artistes fake
   * Ajout de ces artistes en BDD
   */
  const artists = generateArtists(NB_ARTISTS);
  const insertedArtists = await insertArtists(artists);
  debug(`${insertedArtists.length} artists inserted`);
  const artistIds = insertedArtists.map((artist) => artist.id);

  /**
   * Génération des genres fake
   * Ajout de ces genres en BDD
   */
  const genres = generateGenres(NB_GENRES);
  const insertedGenres = await insertGenres(genres);
  debug(`${insertedGenres.length} genres inserted`);

  /**
   * Génération des albums fake
   * Ajout de ces albums dans la BDD
   */
  const albums = await generateAlbums(NB_ALBUMS, artistIds);
  const insertedAlbums = await insertAlbums(albums);
  debug(`${insertedAlbums.length} albums inserted`);
  const albumIds = insertedAlbums.map((album) => album.id);

  /**
   * Génération des chansons fake
   * Ajout de ces chansons dans la BDD
   */
  const songs = await generateSongs(NB_SONGS, albumIds);
  const insertedSongs = await insertSongs(songs);
  debug(`${insertedSongs.length} songs inserted`);

  db.originalClient.end();
})();

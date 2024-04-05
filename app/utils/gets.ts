import { type Knex } from 'knex';

import { DurationRange, ReleaseYear } from '#enums';
import { type CoreDatamapperOptions } from '#types';
import { checkAuthentification, convertFromMinuteToSecond } from '#utils';

export function getIndexFromEnumValue(
  enumType: { [x: string]: any },
  enumValue: string | number,
) {
  const indexOfS = Object.values(enumType).indexOf(enumValue as unknown as typeof enumType);
  const key = Object.keys(enumType)[indexOfS];

  return key;
}

export function getDurationFilterQuery(
  query: Knex.QueryBuilder,
  filter: CoreDatamapperOptions['filter'],
) {
  if (filter?.duration_filter === DurationRange.ONE_MINUTE) {
    return query.where('duration', '<=', convertFromMinuteToSecond(1));
  }

  if (filter?.duration_filter === DurationRange.ONE_TO_THREE_MINUTES) {
    return query.whereBetween('duration', [convertFromMinuteToSecond(1), convertFromMinuteToSecond(3)]);
  }

  if (filter?.duration_filter === DurationRange.THREE_TO_FIVE_MINUTES) {
    return query.whereBetween('duration', [convertFromMinuteToSecond(3), convertFromMinuteToSecond(5)]);
  }

  if (filter?.duration_filter === DurationRange.MORE_THAN_FIVE_MINUTES) {
    return query.where('duration', '>=', convertFromMinuteToSecond(5));
  }

  return null;
}

export function getReleaseYearFilterQuery(
  query: Knex.QueryBuilder,
  filter: CoreDatamapperOptions['filter'],
) {
  if (filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_70)) {
    return query.whereBetween('release_year', [ReleaseYear.YEAR_70, ReleaseYear.YEAR_80]);
  }

  if (filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_80)) {
    return query.whereBetween('release_year', [ReleaseYear.YEAR_80, ReleaseYear.YEAR_90]);
  }

  if (filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_90)) {
    return query.whereBetween('release_year', [ReleaseYear.YEAR_90, ReleaseYear.YEAR_2000]);
  }

  if (filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_2000)) {
    return query.whereBetween('release_year', [ReleaseYear.YEAR_2000, ReleaseYear.YEAR_2010]);
  }

  if (filter?.release_year === getIndexFromEnumValue(ReleaseYear, ReleaseYear.YEAR_2010)) {
    return query.whereBetween('release_year', [ReleaseYear.YEAR_2010, ReleaseYear.YEAR_2010 + 10]);
  }

  return null;
}

export function getLikedFilterQuery(
  query: Knex.QueryBuilder,
  userEncoded: string | undefined,
  liked: boolean,
) {
  const artistId = checkAuthentification({ userEncoded });

  if (artistId == null) {
    return null;
  }

  if (liked) {
    return query.join(
      'artist_like_song',
      'song.id',
      'artist_like_song.song_id',
    ).where('artist_like_song.artist_id', artistId);
  }
  return query.join(
    'artist_like_song',
    'song.id',
    'artist_like_song.song_id',
  ).whereNot('artist_like_song.artist_id', artistId);
}

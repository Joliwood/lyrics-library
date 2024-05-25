import { type Knex } from 'knex';

import { DurationRange, ReleaseYear } from '../../types/__generated_schemas__/graphql';

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
  durationFilter: DurationRange,
) {
  if (durationFilter === DurationRange.OneMinute) {
    return query.where('duration', '<=', convertFromMinuteToSecond(1));
  }

  if (durationFilter === DurationRange.OneToThreeMinutes) {
    return query.whereBetween('duration', [convertFromMinuteToSecond(1), convertFromMinuteToSecond(3)]);
  }

  if (durationFilter === DurationRange.ThreeToFiveMinutes) {
    return query.whereBetween('duration', [convertFromMinuteToSecond(3), convertFromMinuteToSecond(5)]);
  }

  if (durationFilter === DurationRange.MoreThanFiveMinutes) {
    return query.where('duration', '>=', convertFromMinuteToSecond(5));
  }

  return null;
}

export function getReleaseYearFilterQuery(
  query: Knex.QueryBuilder,
  releaseYear: ReleaseYear,
) {
  if (releaseYear === ReleaseYear.Year_70) {
    return query.whereBetween('release_year', [1970, 1980]);
  }

  if (releaseYear === ReleaseYear.Year_80) {
    return query.whereBetween('release_year', [1980, 1990]);
  }

  if (releaseYear === ReleaseYear.Year_90) {
    return query.whereBetween('release_year', [1990, 2000]);
  }

  if (releaseYear === ReleaseYear.Year_2000) {
    return query.whereBetween('release_year', [2000, 2010]);
  }

  if (releaseYear === ReleaseYear.Year_2010) {
    return query.whereBetween('release_year', [2010, 2020]);
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

export function getCreatedByUserFilterQuery(
  query: Knex.QueryBuilder,
  createdByUser: boolean,
  userEncoded: string | undefined,
) {
  const artistId = checkAuthentification({ userEncoded });

  if (artistId == null) {
    return null;
  }

  if (!createdByUser) {
    return query.whereNot('artist_id', artistId);
  }

  return query.where('artist_id', artistId);
}

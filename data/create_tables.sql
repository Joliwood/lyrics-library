BEGIN;

-- Création des domaines
CREATE DOMAIN "year" AS integer
CHECK (value >= 1900 AND value <= 2100);

CREATE DOMAIN "duration" AS integer
CHECK (value >= 0);

-- Création des tables
CREATE TABLE "artist" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "country" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "album" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "release_year" year,
  "artist_id" INT NOT NULL REFERENCES "artist" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "song" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "duration" duration NOT NULL,
  "lyrics" TEXT,
  "album_id" INT NOT NULL REFERENCES "album" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;
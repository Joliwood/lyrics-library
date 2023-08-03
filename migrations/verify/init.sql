-- Verify lyrics_library:init on pg

BEGIN;

SELECT * FROM "song" WHERE false;
SELECT * FROM "album" WHERE false;
SELECT * FROM "artist" WHERE false;

ROLLBACK;

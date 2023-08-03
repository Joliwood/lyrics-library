-- Revert lyrics_library:init from pg

BEGIN;

DROP TABLE 
    "song",
    "album",
    "artist";

DROP DOMAIN
    "duration",
    "year";

COMMIT;

# MLD for mocodo

:
posseder, 1N album, 0N song: album_id, song_id
:

album: id, title, cover, release_year,_artist_id
creer, 0N artist, 01 song
song: id, title, duration, cover, lyrics,_artist_id

creer2, 0N artist, 01 album
artist: id, name, cover, country, email, password
aimer, 0N artist, 0N song

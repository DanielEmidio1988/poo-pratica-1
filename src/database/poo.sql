-- Active: 1675097200892@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    upload_dt TEXT DEFAULT(DATETIME()) NOT NULL
); 

SELECT * FROM VIDEOS;

INSERT INTO videos (id,title,duration)
VALUES ("v001", "Trailer Spider Man 3", "00:10")
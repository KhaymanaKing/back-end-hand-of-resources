-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS candies;
DROP TABLE IF EXISTS ufos;
DROP TABLE IF EXISTS comics;

CREATE TABLE beers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    beer_name VARCHAR,
    abv INT,
    region VARCHAR,
    ibu INT,
    pairing VARCHAR    
);
CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    release_year BIGINT,
    director VARCHAR
);

CREATE TABLE candies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    candy_name VARCHAR,
    chocolate BOOLEAN,
    taste_rating INT
);

CREATE TABLE ufos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ufo_name VARCHAR,
    ufo_location VARCHAR,
    ufo_year INT
);

CREATE TABLE comics (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comic_name VARCHAR, 
    original_release INT,
    publisher VARCHAR
);

INSERT INTO beers (
beer_name,
abv,
region,
ibu,
pairing
)

VALUES
('Elysian Space Dust IPA', '4', 'Washington', '62', 'Fish-white, Fruit-Sweet'),
('Rogue Dead Guy Ale', '7', 'Oregon', '40', 'Pork, Beef'),
('Voodoo Ranger Imperial IPA', '9', 'Colorado', '70', 'Cheese, Cured Meats'),
('Rogue Hazelnut Brown Nectar', '6', 'Oregon', '33', 'Cheese, Turkey'),
('Rolling Rock Extra Pale', '5', 'Missouri', '5', 'Nuts, Cured Meats');

INSERT INTO movies (
title,
release_year,
director
)
VALUES
('Army of Darkness', '1992', 'Sam Raimi'),
('Annihilation', '2018', 'Alex Garland' ),
('Mortal Kombat','1995', 'Paul W.S. Anderson'),
('Ip Man', '2008', 'Wilson Yip'),
('The Ritual', '2017', 'David Bruckner');

INSERT INTO candies (
candy_name,
chocolate,
taste_rating
)

VALUES
('Butterfinger', 'true', '7'),
('Charleston Chew', 'false', '8'),
('Sour Skittles', 'false', '3'),
('Reeses', 'true', '9'),
('Rocky-Road', 'true', '10');

INSERT INTO ufos ( 
ufo_name,
ufo_location,
ufo_year
)

VALUES
('Ships in the Sky', 'Rome, Italy', '218'),
('1561 Celestial Phenoomenon over Nuremberg', 'Nuremberg, Holy Roman Empire', '1561'),
('Mystery Airships', 'Otago, New Zealand', '1909'),
('Miracle of the Sun', 'Fátima, Santarém District, Portugal', '1917'),
('Thomas Mantell', 'Kentucky, United States', '1948');

INSERT INTO comics (
comic_name,
original_release,
publisher
)

VALUES 
('The Invisibles', '1994', 'Vertigo'),
('Preacher', '1995', 'Vertigo'),
('Scott Pilgrim', '2004', 'Oni Press'),
('Samurai Cat', '1984', 'Tor Books'),
('Soul Plumber', '2021', 'DC')
-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS movies;

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
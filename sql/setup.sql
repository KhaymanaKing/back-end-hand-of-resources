-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS beers

CREATE TABLE beers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    beer_name VARCHAR REQUIRED,
    abv INT,
    region VARCHAR,
    ibu INT,
    pairing VARCHAR    
)

INSERT INTO beers (
 beer_name,
 abv,
 region,
 ibu,
 pairing
)

VALUES
('Elysian Space Dust IPA', '4.3', 'Washington', '62', 'Fish-white, Fruit-Sweet'),
('Rogue Dead Guy Ale', '6.8', 'Oregon', '40', 'Pork, Beef'),
('Voodoo Ranger Imperial IPA', '9', 'Colorado', '70', 'Cheese, Cured Meats'),
('Rogue Hazelnut Brown Nectar', '5.6', 'Oregon', '33', 'Cheese, Turkey'),
('Rolling Rock Extra Pale', '4.6', 'Missouri', '5', 'Nuts, Cured Meats')
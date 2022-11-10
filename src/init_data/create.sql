
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS grocery_list CASCADE;
CREATE TABLE grocery_list(
    grocery_list_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS ingredients;
CREATE TABLE ingredients(
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity SMALLINT
);

DROP TABLE IF EXISTS recipes;
CREATE TABLE recipes(
    recipe_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS users_to_grocery;
CREATE TABLE users_to_grocery(
    username VARCHAR(50),
    grocery_list_id SMALLINT
);

DROP TABLE IF EXISTS users_to_ingredients;
CREATE TABLE users_to_ingredients(
    username SMALLINT,
    ingredient_id SMALLINT
);



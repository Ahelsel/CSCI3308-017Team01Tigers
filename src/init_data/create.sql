DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS grocery_list CASCADE;
CREATE TABLE grocery_list(
    grocery_list_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50)
);

DROP TABLE IF EXISTS grocery_list_items;
CREATE TABLE grocery_list_items(
    grocery_list_items_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity SMALLINT,
    username VARCHAR(50)
);

DROP TABLE IF EXISTS recipes;
CREATE TABLE recipes(
    recipe_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
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
    name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS recipes;
CREATE TABLE IF NOT EXISTS recipes(
    recipe_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS users_to_grocery_lists;
CREATE TABLE IF NOT EXISTS users_to_grocery_lists(
    username VARCHAR(50),
    grocery_list_id SMALLINT
);

DROP TABLE IF EXISTS grocery_list_to_ingredients;
CREATE TABLE IF NOT EXISTS grocery_list_to_ingredients(
    grocery_list_id SMALLINT,
    ingredient_id SMALLINT
);

DROP TABLE IF EXISTS users_to_recipes;
CREATE TABLE IF NOT EXISTS users_to_recipes(
    username VARCHAR(50),
    recipe_id SMALLINT
);

DROP TABLE IF EXISTS recipes_to_ingredients;
CREATE TABLE IF NOT EXISTS recipes_to_ingredients(
    recipe_id SMALLINT,
    ingredient_id SMALLINT
);
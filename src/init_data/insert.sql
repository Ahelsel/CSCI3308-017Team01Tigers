INSERT INTO users(username, password) VALUES ('test', '123');

INSERT INTO grocery_list(grocery_list_id, name) VALUES (1, 'myGroceryList');

INSERT INTO ingredients(ingredient_id, name) VALUES (1,'salt'); 

INSERT INTO recipes(recipe_id, name) VALUES (1,'salty dinner');

INSERT INTO users_to_grocery_lists(username, grocery_list_id) VALUES ('test',1);

INSERT INTO grocery_list_to_ingredients(grocery_list_id, ingredient_id) VALUES (1,1);

INSERT INTO users_to_recipes(grocery_list_id, ingredient_id) VALUES (1,1);

INSERT INTO recipes_to_ingredients(recipe_id, ingredient_id) VALUES (1,1); 

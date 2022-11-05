
# Team Meeting: October 31, 2022 @ 2:30 PM 

## Decisions Made 

	1. We'll have a separate list for recipes and groceries. 
		- Recipes will be from a third-party source
			- Spoonacular Recipe API
		- Groceries/Ingredient will be added/removed by the user
				- Make a list of groceries for the user to choose from

	2. There will be a button to add the recipes to the grocery list

	3. There will be a button to remove the ingredients from the grocery list. 

	4. Add an 'ingredients' and 'recipes' tables in addition to the users tables. 

	5. 'Recipes' table. 

	6. Create the front end:
		- Pages/Partials
			- Login
			- Header/Footer
			- Nav-Bar
		- NavBar
			- Home (Grocery List)
			- Recipes
		- Visualize the Grocery List


## Alternative Actions / Options Discussed 

	1. Different Layout/Relationship between all of the tables.
		- (Ingredients -> Recipes -> Users), etc. 

## Follow-Up Items / Roles & Responsibilities

	Anthony - NodeJS / API Calls + Front End 

	Kaitlyn - Front End / API Calls

	Sam - SQL 

	Evan - SQL

## Completed Items During Meeting:

	1. Added 'init_data' and 'create.sql'
	
	2. Created directory structures
		- index.js
		- Views/Pages
		- Docker Compose 

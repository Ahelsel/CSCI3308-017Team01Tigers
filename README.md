# Go Groceries

**Vision Statement:** Go Groceries is here to help college students shop at a grocery store, while providing great budget suggestions for healthy alternatives to the typical college diet.

## Application Description:

For the average college student, Go Grocers offers simplicity to the grocery-buying process, with the ability to type in a grocery item and the quantity to populate your grocery list. There'll also be a list that will keep track of the items that you already have and will show recipes that can be mdae with those items. Once the item is obtained, users can check the item which will take it off the list. When adding a recipe, all the ingredients needed fo the recipe will automatically be added to the grocery list if not already there. 

In order to save on time and add more variety, we'll populate our recipes from the trustworthy recipe API *Spoonacular*. These recipes will be displayed in a different tab in a grid layout where users can view the recipes and have an option to add the recipe to their recipe list. 

## Contributors:

* **Sam Sherman**, sham-serman, sash3295@colorado.edu
* **Evan Thompson**, ze3roop, evth6324@colorado.edu
* **Kaitlyn Huynh**, kaitlynh770, kahu1074@colorado.edu
* **Anthony Helsel**, Ahelsel, anhe8976@colorado.edu

## Technology Stack used for the project: 

* EJS
* JavaScript
* CSS

## Prerequisites to run the application (software that needs to be installed to run the application):

* Docker Desktop (follow these instruction to install Docker Desktop: https://docs.docker.com/desktop/)

## Instructions to run the application locally:

### Running for first time:

1. Clone the repository locally
2. Open Docker Desktop
3. Use a terminal to go to the directory of the repository on your local system using the command: `cd CSCI3308-017Team01Tigers/src`
4. Delete node_modules folder with: `rm -r node_modules`
5. Go back to main directory using `cd ..`
6. Run docker compose with the command: `docker compose up`
7. After the message `Database connection successful` displays, you can open the website on a browser with the hyperlink http://localhost:3000 
8. From here you can register with a username and a password.

### Running after first time: 

1. Open Docker Desktop
2. Use a terminal to go to the directory of the repository on your local system using the command: `cd CSCI3308-017Team01Tigers`
3. Run docker compose with the command: `docker compose up`
4. After the message `Database connection successful` displays, you can open the website on a browser with the hyperlink http://localhost:3000
5. From here you can login on the login page using the same username and password that were used to register. 

## How to run tests:

N/A

## Link to the deployed application:

http://localhost:3000

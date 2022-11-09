# Release Notes

## Week 0 (Friday, October 28  -> Tuesday, November 1)
### Project Kick-Off:
    - Repository Created:
        Repository structured to the guidelines laid out in the Lab write-up. 

### Resources Added:
    - Team Plan PDF.
        Located in src directory, called ```the tigers.pdf```. Contains vision statement and general information about what features the website will have as well as information (email/github) of the contributors. 

## Week 1 (Tuesday, November 1 -> Tuesday, November 7)
 
### New pages created:
Pages styled using style.css 
    - Home/Groceries Page:
        Currently contains a hard-coded list of ingredients that represents what the ingredient/grocery list will look like in the future. In the future this page will be home to the grocery list of the user when logged in.
    - Login Page:
        Contains a username/password field with a prompt to register if you have not yet created an account. 
    - Recipes Page:
        Currently contains the username/password register fields. In the future, will have a list of recipes from the API. 
### Features Added:
    - Docker Compose:
        Using ```docker compose up``` in the command line now launches a docker container and the website can be viewed. (To view the website, type ```localhost:3000``` into the URL box of your web browser.)
                - If docker compose is giving an error related to bcrypt, delete the ```node_modules``` directory and then retry.
    - index.js:
        - /login:
            GET request renders the login screen.
            POST request takes in username and password from the login screen; If successful renders the calls ```/recipes```, otherwise it shows an error message. 
        - /logout: 
            Destroys the session, renders the ```pages/login``` page.
        - /recipes: 
            GET request renders the ```pages/recipes``` page. The GET request will results to the recipes page (If there's not an error).
        - /groceries:
            GET request renders the ```pages/groceries``` page.
        - /register:
            GET request renders the register page with username/password fields.
            POST request adds the user to the table if they don't already exist, then renders the login page.

### Resources Added:
    - ER Diagram:
        Highlights the layout of the tables within the database, as well as the foreign and primary keys that will be used. (Located in ```/Milestone Submissions``` directory)
    - Testing Guidelines
        An outline of how testing will work for the application once it is near completion. These testing strategies will be implemented once the application is closer to completion, but the outline can be viewed in the ```Testing Assignment.pdf``` file in the ```/Milestone Submissions``` directory.

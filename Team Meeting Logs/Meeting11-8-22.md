# Meeting November 8, 2022 @ 4:10 PM

## Items Completed Since Last Meeting

Created and linked a style.css sheet for the home page.

Created a new route for the home page.

Static mockup of what a grocery list will look like (Hard Coding)


## Things to do

Create branches (don't push directly to the main line)

Update the project dashboard: 
    - Description
    - Acceptance Criteria 
    - Epic

Release Notes:
    - Add release notes from Project Guidelines

Plans for This Week:
    - Get the API Working (running into errors right now)
    - Static UI to see what the website will look like

Plan for next week:
    - Work on dynamic UI 
    - 


# Work Tracker 
Add: Number of commits you've done
     What you plan on doing for the week

    Anthony:
        - Debug 'Random Recipe' Api call
            - Retrieves 24 random recipes from the Spoonacular API. 
        - Added Recipes page
            - Cards w/Image + Title for each retrieved recipe. 
            - Styling (rounded corners, headings, green, card spacing)
        - Added '/getRecipe' API call that retrieves specific recipe when 'Add Ingredient' button is pressed on the Recipes card.
        - Previous Weeks' Release Notes that we were missing.

    Kaitlyn: 9 commits total
        - Created basic logic for grocery list and adding to grocery list
        - Helped on debugging API call
        - Changed stying of login page
        - Fixed issue with logo not rendering
        - Created feature that crosses out grocery item when checkbox is clicked

    Evan: 23 commits Total
        - Did Readme.md.
        - Did app.get("/groceries"). Now able to view groceries on the list, but only with a hard coded grocery_list_id at the moment.
        - Did app.post("/groceries"). Now able to add groceries and respective quantities to the list, but only with a hard coded grocery_list_id at the moment.
        - Updated create.sql tables to be more coherent, and added an insert for the hard coded grocery_list_id.
    Sam: 2 commits total
        - Added feature to Register page whihc requires the user to include 8 charcaters, 1 upper case letter, 1 lower case letter, and 1 number in their password
        - Used css file styling to style the register page similar to the login page

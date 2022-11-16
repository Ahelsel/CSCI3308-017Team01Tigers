const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');

// database configuration
const dbConfig = {
    host: "db",
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };
  
  const db = pgp(dbConfig);
  
  // test your database
  db.connect()
    .then(obj => {
      console.log('Database connection successful'); // you can view this message in the docker compose logs
      obj.done(); // success, release the connection;
    })
    .catch(error => {
      console.log('ERROR:', error.message || error);
    });

    app.set("view engine", "ejs");

    app.use(bodyParser.json());

    app.use("/resources/img", express.static(__dirname + "/resources/img"))
    app.use("/resources/fonts/Offside", express.static(__dirname + "/resources/fonts/Offside"));
    app.use("/resources/fonts/Fjalla_One", express.static(__dirname + "/resources/fonts/Fjalla_One"));

    app.use(
        session({
          secret: process.env.SESSION_SECRET,
          saveUninitialized: false,
          resave: false,
        })
      );
      
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use("/resources/css", express.static(__dirname + "/resources/css"))

      app.get("/", (req, res) =>{
        res.render("pages/login");
      });

    app.get("/register", (req, res) => {
      res.render("pages/register");
    });


    app.post("/register", async (req, res) => {
        const username = req.body.username;
        const hash = await bcrypt.hash(req.body.password, 10);
        const query = "INSERT INTO users (username, password) VALUES ($1, $2);"
        db.any(query, [username, hash])
        .then(() => {
            res.redirect("/login");
          })
        .catch(() => {
            res.redirect("pages/register");
          });
    });

    app.get("/login", (req, res) => {
        res.render("pages/login");
      });
    
    const user = {
      username: undefined,
      password: undefined,
    };

    app.post("/login", (req, res) => {
        const username = req.body.username;
        const query = "SELECT username, password FROM users WHERE username = $1";
        const values = [username];
        db.one(query, values)
          .then(async(data) => {
            const match = await bcrypt.compare(req.body.password, data.password);
            if(!match){
                res.render("pages/login", {
                  data,
                  message: "Incorrect username or password.",
                });
            }

            else{ //if user logs in with correct password to an already existing username 
              user.password = data.password;
              user.username = data.username;
                req.session.user = {
                    api_key: process.env.API_KEY,
                };
                req.session.save();
                res.redirect("/groceries");
            }
          })
          .catch((err) => {
            console.log(err);
            if(err.username==null){
              return res.redirect("/register");
            }
            //if database query fails:
            res.render("pages/login", {
              error: true,
              message: err.message,
            });
          })
      });

      

    // Authentication Middleware.
    const auth = (req, res, next) => {
      if (!req.session.user) {
        // Default to register page.
        return res.redirect('/register');
    }
      next();
    };

    // Authentication Required
    app.use(auth);

    app.get("/groceries", (req, res) => {  
      //query to list grocery list of user
      const username = user.username;
      const query = 
        "SELECT * FROM grocery_list_items WHERE username = $1";
      const value = [username];
      db.any(query, value)                                              
        .then((groceries) => {
          res.render("pages/groceries", {
            groceries,
          });
        })
        .catch((err) => {
          res.render("pages/groceries", {
            groceries: [],
            error: true,
            message : err.message,
          });
        });
    });

    app.post("/groceries", (req, res) =>{
      const newGrocery = req.body.newGrocery; 
      const quantity = req.body.quantity;
      // const grocery_list_id = 1;//hard coded for now, create drop down to choose grocery lists later that will fill this variable as req.body.grocery_list_id.
      const username = user.username;
    
      const query = "INSERT INTO grocery_list_items (name, quantity, username) VALUES ($1, $2, $3)";
      db.any(query, [newGrocery, quantity, username])
        .then((groceries) => {
          res.redirect("/groceries");
        })
        .catch((err) => {
          res.render("pages/groceries", {
            groceries,
            error: true,
            message : err.message,
          });
        });
    });

    app.post("/groceries/checked", (req, res) => {
      const { checkGrocery } = req.body;
      //console.log(checkGrocery);
      res.render("pages/groceries");
    });

    app.get("/recipes", (req, res) => {
      axios({
          url: `https://api.spoonacular.com/recipes/random?apiKey=${req.session.user.api_key}`,
            method: 'GET',
            dataType:'json',
            apiKey: req.session.user.api_key,
            params: {
                "x-api-key": req.session.user.api_key,
                limitLicense: true,
                "number": 25,
            }
        })
        .then((results) => {
          // the results will be displayed on the terminal if the docker containers are running
         // Send some parameters
            //console.log(results);
            // let ingredient = results.data.recipes[0].extendedIngredients;
            // ingredient.forEach(el => {
            //   console.log(el.nameClean);
            // })
            //console.log(results.data.recipes);
            res.render("pages/recipes", {
            results: results,
          });
        })
        .catch((err) => {
          //If the API call fails, render pages/discover with an empty results array results: [] and the error message.
          console.log(err);
          res.render("pages/recipes", {
            results: [],
            error: true,
            message: err.message,
          });
        });
    });

    app.get("/getrecipe", (req, res) => {
      //console.log("REQ RECIPE ID: " + req.query.recipe_id);
      let rec_id = req.query.recipe_id;
      axios({
        url: `https://api.spoonacular.com/recipes/${rec_id}/information?apiKey=${req.session.user.api_key}`,
        method: 'GET',
        dataType: 'json',
        apiKey: req.session.user.api_key,
        params: {
          "x-api-key": req.session.user.api_key,
        }
      })
      .then((results) => {
        const query = "INSERT INTO grocery_list_items (name, quantity, username) VALUES ($1, $2, $3)";
        let trigger = true; //what is this trigger for? 
        results.data.extendedIngredients.forEach(item => {
          db.any(query, [item.name, item.measures.metric.amount, user.username])
          .then((groceries) => {
            console.log("GOOD");
          })
          .catch((err) => {
            console.log("BAD: " + err)
            trigger = false;
          });
        })
        res.redirect("/groceries");
      })
      .catch((err) => {
        console.log("OUTSIDE ERROR: " + err);
        res.render("pages/groceries", {
          groceries: [],
          results: [],
          error: true,
          message: err.message,
        });
      });
    });

    app.get("/logout", (req, res) => {
      req.session.destroy();
      //res.status(200).send('Logged out Successfully.');
      res.render("pages/login");
      //logged out successfully message here. 
      console.log('Logged out Successfully.');
    });

      app.listen(3000);
      console.log('Server is listening on port 3000');
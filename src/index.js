const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');

// database configuration
const dbConfig = {
    host: 'db',
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

    app.set('view engine', 'ejs');

    app.use(bodyParser.json());

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
      app.get('/', (req, res) =>{
        res.redirect('/login'); //this will call the /anotherRoute route in the API
      });
      
    app.get('/register', (req, res) => {
      res.render('pages/register');
    });

    app.post('/register', async (req, res) => {
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
            
            user.password = data.password;
            const match = await bcrypt.compare(req.body.password, user.password); //req.body.password is defined
            
            if(!match){
                res.render("pages/login", {
                  data,
                  message: "Incorrect username or password.",
                });
            }
            else{
                req.session.user = {
                    api_key: process.env.API_KEY,
                };
                req.session.save();
                res.redirect("/recipes"); //just like the discover page from lab9 
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


    app.get("/recipes", (req, res) => {
      axios({
          url: `https://api.spoonacular.com/food/search`,
            method: 'GET',
            dataType:'json',
            params: {
                "apikey": req.session.user.api_key,
                "query": "pasta", //you can choose any food search here
                "size": 10,
            }
        })
        .then((results) => {
          // the results will be displayed on the terminal if the docker containers are running
         // Send some parameters
            res.render("pages/recipes", {
            results,
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

    app.get("/logout", (req, res) => {
      req.session.destroy();
      //res.status(200).send('Logged out Successfully.');
      res.render("pages/login");
      //logged out successfully message here. 
      console.log('Logged out Successfully.');
    });

      app.listen(3000);
      console.log('Server is listening on port 3000');
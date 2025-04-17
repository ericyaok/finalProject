const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;



const port = process.env.PORT || 8080;
const mongodb = require('./data/database');



app.use(bodyParser.json());
app.use('/', require('./routes'));

app.use(cors()); // Enable CORS for all routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));



// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        // You can create or find the user in your DB here
        return done(null, profile);
    }
));


app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// Trigger GitHub login
app.get('/auth/github',
    //passport.authenticate('github', { scope: ['user:email'] })
    passport.authenticate('github'), (req, res) => { }
);

// GitHub callback
app.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/github' }),
    function (req, res) {
        // Successful login
        res.redirect('/');
    }
);

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});







mongodb.initDb((err) => {
    if (err) {
        console.error("Failed to initialize database:", err);
        process.exit(1); // Exit the process if the database connection fails
    } else {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is listening on port ${port}`);
        });
    }
});


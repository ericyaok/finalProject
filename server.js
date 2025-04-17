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

// Parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Session and Passport setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport GitHub strategy
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
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// GitHub Auth routes
app.get('/auth/github', passport.authenticate('github'));

app.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/github' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Mount routes (AFTER Passport/session middleware)
app.use('/', require('./routes'));

// Start server after DB init
mongodb.initDb((err) => {
    if (err) {
        console.error("Failed to initialize database:", err);
        process.exit(1);
    } else {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is listening on port ${port}`);
        });
    }
});

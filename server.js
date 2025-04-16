const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();



const port = process.env.PORT || 8080;
const mongodb = require('./data/database');



app.use(bodyParser.json());
app.use('/', require('./routes'));




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


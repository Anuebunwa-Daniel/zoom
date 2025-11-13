require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');
const path =require('path')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');




const adminR = require('./routes/adminR.js');
const userR = require('./routes/userR.js');

//schema
const dataB = require('./model/dataB.js'); 

//database name
const model = require('./model/database.js'); 
//im just trying out the git hub stuuf

// --- Initialize Express ---
const app = express(); 
 
// --- Connect to MongoDB ---
mongoose.connect(model.database)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err + ' Database connection failed'));

  // --- Middleware setup ---
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  // --- Set up EJS view engine ---
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use('/', adminR);
  app.use('/', userR);

  // --- Body Parser (optional, you already have express.json) ---
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());



// --- Start the server ---
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server connected to port ${port}`);
});
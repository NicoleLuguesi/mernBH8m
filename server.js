const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const connectDB = require('./config/db');
const { mongoUri } = require('./config')

app.use(cors());
app.use(express.json());

const users = require('./routes/api/users');

app.use("/api/users", users)


//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

mongoose
.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true  } )
.then(() => console.log("Connected to db"))
.catch((error) => console.error("Failed to connect to db", error));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server has started on port ${port}`));

//testing gitignore for future pushes

// cors accepts request from any system - security of site

// mongoose naming conventions
// Model User
// collection users
//model files -> User.js
// routes -> users.js

// validate the body
// must have email and password
// make sure it's a valid email
// min password 6 character
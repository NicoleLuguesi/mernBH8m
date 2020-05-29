const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const connectDB = require('./config/db');
const { mongoUri } = require('./config')

app.use(cors());
app.use(express.json());

mongoose
.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true  } )
.then(() => console.log("Connected to db"))
.catch((error) => console.error("Failed to connect to db", error));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server has started on port ${port}`));

//testing gitignore for future pushes

// cors accepts request from any system - security of site


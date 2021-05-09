// import top level dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');




// initial express server
const server = express();

// middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))

// setup database connection 
mongoose.connect(process.env.MONGO, {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(connected => console.log("database connection established "))
    .catch(error => console.error("database error caused by " + error.message));

// server routes config
server.use('/account', require('./routes/users'));

// server listener
server.listen(process.env.PORT, () => console.log("server running just fine..."))
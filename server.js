// import top level dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const MethodOverride = require('method-override');


const User = require('./routes/users.js');
const Vehicle = require('./routes/vehicle.js');
const Upload = require('./routes/upload.js');

// initial express server
const server = express();

// setup database connection 
mongoose.connect(process.env.MONGO, {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(connected => console.log("database connection established "))
    .catch(error => console.error("database error caused by " + error.message));

// middlewares
server.use(cors());
server.use('/uploads', express.static(path.join(__dirname, '/uploads')))
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }))
server.use(MethodOverride('_method'))
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, GET, OPTIONS, DELETE"
        );
        return res.status(200).json({});
    }

    next();
});



// server routes config
server.use('/account', User);
server.use('/vehicle', Vehicle);
server.use('/upload', Upload);

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // set static 
    server.use(express.static('client/build'));

    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 8000;

// server listener
server.listen(PORT, () => console.log("server running just fine..."))
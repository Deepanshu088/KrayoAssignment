// Importing Libraries
const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
// const logger = require('morgan');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');


// Declaring Global Constants

// Listing Custom imports
const HttpError = require('./models/httpError')
const passportSetup =  require('./passport');
const userRoute = require('./routes/userRoute');
const authCheck = require("./middlewares/authCheck");
// const ticketsRoute = require('./routes/ticketRoute')

// // Mogoose Connection
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.iu28p.mongodb.net/${process.env.DB_NAME}`)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error!!:'));
db.once('open', function() {
    console.log("Connected to Database :)");
});

// Default Middlewares
app.use(
    cookieSession({
        name: "session",
        secret: process.env.SECRET,
        maxAge: 24*60*60*100
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use((req,res,next)=>{
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
})
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
// app.use(morgan('combined', { stream: accessLogStream }))

// Logs requests
// app.use(morgan(':remote-addr :url :method HTTP/:http-version :user-agent', {
//     // https://github.com/expressjs/morgan#immediate
//     immediate: true,
//     stream: accessLogStream
//   }));
  
// Logs responses
app.use(morgan(':method :url :status :res[content-length] :response-time ms :res[header]', {
    stream: accessLogStream
  }));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :res[header]'))

app.use('/upload/', authCheck, express.static(path.join(__dirname, 'upload')) );

// Listing Routes Here
app.use('/auth', userRoute);



app.use((req, res, next)=>{
    throw new HttpError('Unknown Route!!! This route is not supported. ',404);
});

app.use((error, req, res, next) =>{
    if(req.file){
        fs.unlink(req.file.path, err =>{
            console.log(err);
        })
    }
    if(res.headerSent){
        return next(error);
    }else{
        console.log(error.message);
        res.status(error.code || 500);
        res.json({message: error.message || 'Unknown Error!!! Something went wrong.'})
    }
});

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})
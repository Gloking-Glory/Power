const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const URI = process.env.MONGO_URI;

mongoose.connect(URI);
mongoose.Promise = global.Promise;

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

const userRouter = require('./routes/userRoute');

app.use('/', userRouter);


app.listen(PORT, ()=> {
    console.log("server connected");
})
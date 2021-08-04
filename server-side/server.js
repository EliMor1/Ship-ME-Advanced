

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const adminUrls = require('./routes/admin');
const authUrls = require('./routes/authentication');
const accountUrls = require('./routes/account');

const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, ()=> console.log("Database is connected successfully"));

app.use(express.json());
app.use(cors());
app.use('/app',adminUrls);
app.use('/app/auth', authUrls);
app.use('/app/account',accountUrls);


app.listen(4000, function(){
    console.log("Server is running on port 4000");
});
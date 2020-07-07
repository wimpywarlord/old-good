const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var nodemailer = require('nodemailer');
const cron = require('node-cron');
const Razorpay = require('razorpay')
const shortid = require('shortid')
var templates = require('./routes/templates');

const app = express();


// middleware
app.use(bodyParser.json());
app.use(cors());



const posts = require('./routes/api/posts');
app.use('/api/posts', posts);



const proV = require('./routes/api/proV');
app.use('/api/pro', proV);
// app.post('/api/pro', function (req, res) {
//     console.log("asdsa");
// });

const mailList = require('./routes/api/mailList');
app.use('/api/mailList', mailList);




// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// LISTEN
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
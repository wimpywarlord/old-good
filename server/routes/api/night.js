const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var nodemailer = require('nodemailer');
const cron = require('node-cron');
var mongoose = require("mongoose");
var templates = require('../templates');

var nick_name = ["Candy", "Caramel", "Spicy ", "Hot Stuff", "Pum Pum", "Sugar ", "Angel ", "Juicy ", "Sugar Lips", "Doofus ", "Pizza Face", "Piggy ", "She-poopie", "Miss Independent", "Rockstar", "First Lady", "Chica", "Gangsta ", "Cheerleader ", "Bambi", "Peaches", "Boo", "Crazy Eyes", "Juju Babe", "Butterfingers", "Giggles", "Lioness", "Couch Potato", "Dove", "Brat", "Coco", "Hipster", "Nutty", "Shortcake"]
var emoji = ["💋", "🍩", "🍻", "🎯", " 💖 ", "💗", "🌕", "💄", "🌏", "👌", "👪", "🌈", "💎", "💌", "💍 ", "💏", "💝", "💞", "💑", "💐"];

var app = express();
app.use(cors())

const router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// GET YOUR OWN CLUSTER
mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'goodmorningGirlfriend' }, function (err, res) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("CONNECTED");
    }
});

var userSchema = new mongoose.Schema(
    {
        email: String,
        name_of_sender: String,
        days: Number
    });


var user = mongoose.model("user", userSchema);

// GOODNIGHT
var everyday_mailingList = [];
async function fetchAllEmails() {
    return new Promise((resolve, reject) => {
        user.find({}, async function (err, users) {
            if (err) {

            } else {
                console.log(users);
                for (let i = 0; i < users.length; i++) {
                    if (users[i].days <= 14) {
                        everyday_mailingList.push([users[i].email, users[i].name_of_sender]);
                        user.findOneAndUpdate({ _id: users[i]._id }, { $inc: { days: 1 } }, function (err, res) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("UPDATED");
                            }
                        });
                        // console.log(everyday_mailingList);
                    }
                    else {
                        console.log("OLDER THAN 14 WEEKS");
                        user.findOneAndDelete({ _id: users[i]._id }, function (err, res) {
                            if (err) {
                                console.log('NOT DELETED');
                            } else {
                                console.log('DELETED');
                            }
                        });
                    }
                }
                console.log(everyday_mailingList, "$");
                resolve(everyday_mailingList);

            }
        })
    });

}

fetchAllEmails().then((everyday_mailingList) => {
    console.log(everyday_mailingList, "asddsa");
    var random_nickname = nick_name[Math.floor(Math.random() * nick_name.length)];
    var random_emoji = emoji[Math.floor(Math.random() * emoji.length)];
    var random_template = templates[Math.floor(Math.random() * templates.length)];
    // console.log('Running Cron Job');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'morningrobot@gmail.com',
            pass: 'ggggffff'
        }
    });

    everyday_mailingList.forEach(element => {
        console.log(element);
        element[1] = element[1][0].toUpperCase() + element[1].slice(1);
        var mailOptions = {
            from: 'greetyourgirlfriend@gmail.com',
            to: element[0],
            subject: `${element[1]} says "Goodnight ${random_nickname} ${random_emoji}"`,
            html: `${random_template}`,
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
});
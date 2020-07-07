const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var nodemailer = require("nodemailer");
const cron = require("node-cron");
var mongoose = require("mongoose");
var templates = require("../templates");

var nick_name = [
    "Candy",
    "Caramel",
    "Spicy ",
    "Hot Stuff",
    "Pum Pum",
    "Sugar ",
    "Angel ",
    "Juicy ",
    "Sugar Lips",
    "Doofus ",
    "Pizza Face",
    "Piggy ",
    "She-poopie",
    "Miss Independent",
    "Rockstar",
    "First Lady",
    "Chica",
    "Gangsta ",
    "Cheerleader ",
    "Bambi",
    "Peaches",
    "Boo",
    "Crazy Eyes",
    "Juju Babe",
    "Butterfingers",
    "Giggles",
    "Lioness",
    "Couch Potato",
    "Dove",
    "Brat",
    "Coco",
    "Hipster",
    "Nutty",
    "Shortcake",
];
var emoji = [
    "💋",
    "🍩",
    "🍻",
    "🎯",
    " 💖 ",
    "💗",
    "🌕",
    "💄",
    "🌏",
    "👌",
    "👪",
    "🌈",
    "💎",
    "💌",
    "💍 ",
    "💏",
    "💝",
    "💞",
    "💑",
    "💐",
];

var app = express();
app.use(cors());

const router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

mongoose.connect(
    "",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "goodmorningGirlfriend",
    },
    function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("CONNECTED");
        }
    }
);

var userSchema = new mongoose.Schema({
    email: String,
    name_of_sender: String,
    days: Number,
});

var user = mongoose.model("user", userSchema);

// LOGIC
router.post("/", function (req, res) {
    // console.log("asdasd");
    console.log(req.body);
    user.create(
        {
            email: req.body.email,
            name_of_sender: req.body.name_of_sender,
            days: req.body.days,
        },
        function (err, yolo) {
            if (err) {
                console.log("DATA IS NOT PUSHED");
            } else {
                console.log("DATA HAS BEEN PUSHED");
            }
        }
    );
});

module.exports = router;

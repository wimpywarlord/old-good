const express = require("express");
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var templates = require("../templates");

var app = express();

const router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var nick_name = [
    "Candy",
    "Caramel",
    "Spicy ",
    "Hot Stuff",
    "Pum Pum",
    "Sugar tits ",
    "Angel Boobs",
    "Juicy ",
    "Sugar Lips",
    "Sexy",
    "Doofus ",
    "Pizza Face",
    "Piggy ",
    "She-poopie",
    "Miss Independent",
    "Rockstar",
    "First Lady",
    "Chica",
    "Gangsta Baby",
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
    "🍌",
    "🍑",
    "🍩",
    "🍻",
    "🎯",
    " 💖 ",
    "💗",
    "🌕",
    "💄",
    "🌏",
    "👉 👌",
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

router.post("/", (req, res) => {
    var random_nickname =
        nick_name[Math.floor(Math.random() * nick_name.length)];
    var random_emoji = emoji[Math.floor(Math.random() * emoji.length)];
    var random_template =
        templates[Math.floor(Math.random() * templates.length)];

    // console.log(random_emoji);
    console.log(req.body);
    // GET YOUR OWN EMAIL ID
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "",
            pass: "",
        },
    });
    // GET YOUR OWN EMAIL ID
    if (req.body.wish == true) {
        var mailOptions = {
            from: "",
            to: req.body.goto_email,
            subject: `GoodMorning ${random_nickname} ${random_emoji}`,
            html: `${random_template}`,
        };
    } else {
        var mailOptions = {
            from: "",
            to: req.body.goto_email,
            subject: `GoodNight ${random_nickname} ${random_emoji}`,
            html: `${random_template}`,
        };
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});

module.exports = router;

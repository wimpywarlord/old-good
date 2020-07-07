const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Razorpay = require("razorpay");
const cron = require("node-cron");
const shortid = require("shortid");

var app = express();
app.use(cors());

const router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// GET YOUR OWN KEYS
const razorpay = new Razorpay({
    key_id: "",
    key_secret: "",
});

router.post("/MailList", (req, res) => {
    console.log("Asdadsa");
});

router.post("/", (req, res) => {
    // console.log("KSHTIIJ DHYANI");
    console.log(req.body);

    const payment_capture = 1;
    const amount = 3; //change this amount

    const options = {
        amount: 0 * 100,
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture,
    };

    razorpay.orders.create(options).then((result) => {
        console.log(result);
        res.json({
            id: result.id,
            currency: result.currency,
            amount: result.amount,
        });
    });
});

var maillist = ["wimpywarlord@gmail.com"];

module.exports = router;

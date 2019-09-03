// server.js
var express = require("express"), nodeMailer = require('nodemailer'), bodyParser = require('body-parser'), cors = require("cors");
var app = express();
var port = 3000;
var ENV = require("./environments/environment.js");


// If a view is needed uncomment below to test server
/*app.set('view engine', 'ejs');*/
/*app.use(express.static('public'));*/
/*app.get('/', function (req, res) {
  res.render('index');
});*/

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/send-email", function (req, res) {
    var transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: ENV.email,
            clientId: ENV.clientId,
            clientSecret: ENV.clientSecret,
            refreshToken: ENV.refreshToken,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: req.body.fullName,
        to: "james.magpantay11@gmail.com",
        subject: "Message From Site",
        text: req.body.message + " from " + req.body.fullName + " EMAIL: " + req.body.email,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        res.render("index");
    });
});
app.listen(port, function () {
    console.log("Server is running at port: ", port);
});

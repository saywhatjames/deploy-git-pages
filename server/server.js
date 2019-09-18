// server.js
var express = require("express"),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser'),
  cors = require("cors"),
  mongoose = require("mongoose"),
  path = require("path"),
  config = require("./DB");

var app = express();
var port = 3000;
const ENV = require("./environments/environment.js");
const contactRoute = require("./routes/contact.route");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser: true}).then(
  () => {
    console.log("Database is connected")
  },
  err => {
    console.log("Can not connect to the database" + err)
  }
);


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/contacts", contactRoute);

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
    from: '"Sky Renovations" <james.magpantay11@gmail.com.com>',
    to: req.body.email,
    subject: "Messaged Received",
    text: "Thank You For Contacting Us. We are looking at your request shortly and will be contacting you soon.",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.status(200).json({"message": "Contact has been added successfully"});
  });
});


app.listen(port, function () {
  console.log("Server is running at port: ", port);
});

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const Step =  require("./routes/step")
const Layout = require("./routes/formLayoutRoutes.js");
const saveFormData = require("./routes/formDataRoutes.js");
const Bank = require("./routes/Bank/bankroutes")
const BankForms =  require("./routes/form/bankfrom")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",Step)
app.use("/", Layout);
app.use("/", saveFormData);
app.use("/",Bank)
app.use("/",BankForms)


module.exports = app;
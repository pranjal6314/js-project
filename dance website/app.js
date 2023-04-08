//first run mongod in terminal
const express = require("Express");
const path = require("path");
const fs = require("fs");
const app = express();
// const bodyparse=require("body-parser");
const port = 800;
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactDance");
var db = mongoose.connection;

//defining mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

const contact = mongoose.model("contact", contactSchema);

//EXPRESS   STUFF
app.use("/static", express.static("static")); //for serviving static file
app.use(express.urlencoded()); //help in taking data from form

//PUG SPECIFIC STUFF
app.set("view engine", "pug"); //set template engine as pug
app.set("views", path.join(__dirname, "views")); //set the view directory
app.get("/", (req, res) => {
  const con = "this is a Dance web site";
  const params = { title: "Dance WebSite", contant: con };
  res.status(200).render("index.pug");
});
app.get("/contact", (req, res) => {
  res.status(200).render("contact.pug");
});
app.post("/contact", (req, res) => {
  var mydata = new contact(req.body);
  mydata
    .save()
    .then(() => {
      res.send("your form hase been send in database");
    })
    .catch(() => {
      res.status(400).send("item was not saved in database");
    });
});
app.listen(port, () => {
  console.log("live");
});

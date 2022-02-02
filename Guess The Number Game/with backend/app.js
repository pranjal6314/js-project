const express=require("express");
const path =require("path");
const fs=require("fs")
const app=express();
const port=800;
var mongoose =require("mongoose");
mongoose.connect('mongodb://localhost/guessNumber');
var db=mongoose.connection;

const guessSchema = new mongoose.Schema({
    name: String
  });
  app.use('/static',express.static('static'));//for serviving static file
 
  app.use(express.urlencoded());//help in taking data from form
const guess = mongoose.model('guess',guessSchema ); 
app.engine('html', require('ejs').renderFile);
// app.set('view engine','ejs');//set template engine as pug
app.set('views',path.join(__dirname,'views'));//set the view directory
app.get('/',(req,res)=>{
    // const con='this is a Dance web site';
    // const params={'title':'Dance WebSite','contant':con};
    res.status(200).render('index.html');
})
app.post('/',(req,res)=>{
    var mydata= new guess(req.body);
    mydata.save().then(()=>{
        res.send("your form hase been send in database");
    }).catch(()=>{
        res.status(400).send("item was not saved in database");
    })
})
app.listen(port,()=>{
    console.log('live');
})

var express = require('express')
const routes = require('../routes'); 
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config({ path: ".env" });

var app = express();


const port = 4001

//mongo connect
mongoose.connect(process.env.BBDD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
}).then(()=>{
  console.log('Conect to mongoDB ON');
}).catch(error => console.log(error));

//habilitar json con body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', routes())

app.listen(port, () => {
    console.log(`El servidor esta corriendo en http://localhost:${port}`)
  })
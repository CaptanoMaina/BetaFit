const express = require('express');
const router = require('./routes/betaFitRoutes');
const path = require('path');
const mustache = require('mustache-express');


const nedb = require('nedb');


const app = express();

const public = path.join(__dirname, 'public');

app.use(express.static('public'))

app.engine('mustache',mustache());
app.set('view engine',  'mustache');




app.use('/',router);

app.listen(3000,() => {
    console.log('Server started on port 3000. Enter Ctrl^c to quit');
})



//const db = new nedb({ filename: 'betaFit.db' , autoload: true });
//console.log('db created');

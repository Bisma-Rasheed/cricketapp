var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencoderParser = bodyParser.urlencoded({extended: false});
require('dotenv').config();

var authRouteController = require('./Controller/authRouteController');
var userRouteController = require('./Controller/userRoutes');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use(express.static(__dirname, { // host the whole directory, all static files that we want to host
    extensions: ["html", "htm", "gif", "png", "jpeg", "webp"],
}));

authRouteController(app, express, urlencoderParser);
userRouteController(app, express, urlencoderParser);

require('./Model/index');
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});

module.exports = app;

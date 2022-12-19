var registerUser = require('../Model/userRegister');
var loginUser = require('../Model/userLogin');
var session = require('express-session');
var db = require('../Model/index');
var User = db.userModel; 
var googleAuthenticator = require('../Model/googleAuth');
var facebookAuthenticator = require('../Model/facebookAuth');

const cookieParser = require('cookie-parser');

module.exports = (app, express, urlencoderParser) => {
    app.use(cookieParser());

    app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
    }));

    //PASSPORT //

    const passport = require('passport');
    var userProfile;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, cb){
        cb(null, user);
    });
    passport.deserializeUser(function(obj, cb){
        cb(null, obj);
    });
    //PASSPORT//

    app.get('/', function(req, res){
        res.render('homepage');
    });


    googleAuthenticator(app, User, passport, userProfile); //both for login and registration
    facebookAuthenticator(app, User, passport, userProfile); //both for login and registration

    //LOGIN ROUTES//
    app.post('/loginPage', urlencoderParser, loginUser.localLogin); //if user is logging in locally
    
    //REGISTRATION ROUTES//
    app.post('/registerPage', urlencoderParser, registerUser.localRegistration); //if user registers locally
};
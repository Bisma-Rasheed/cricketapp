var db = require('./index');
var User = db.userModel;
require('dotenv').config();

var {hashSync, genSaltSync} = require('bcrypt');

var localRegistration = async(req, res) => {

    const name = req.body.username;
    const email = req.body.email;

    const salt = genSaltSync(10);
    const password = hashSync(req.body.password, salt);

    try
    {
        let data = await User.create({
            username: name,
            email: email,
            password: password
        });
        res.render('prompt', {data: 0});
    }
    catch(e){
        res.render('404', {error: '404', alert: e, data:''});
    }
};

module.exports = {
    localRegistration
};
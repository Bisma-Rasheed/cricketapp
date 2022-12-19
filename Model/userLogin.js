var db = require('./index');
var User = db.userModel;
var {compareSync} = require('bcrypt');
var jwt = require('jsonwebtoken');

require('dotenv').config();

var localLogin = async (req, res) => {
    let email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({
        where: {
            email: email
        }
    });

    if(!user)
    {
        res.render('404', {error: '404', alert: 'Invalid Email or Password', data: ''});
    }
    else{
        const isValidPassword = compareSync(password, user.password);
        switch(isValidPassword){
            case true:
                user.password = undefined;
                const jwtToken = jwt.sign({user: user}, process.env.SECRET_KEY);
    
                res.cookie('token', jwtToken, {httpOnly: true, secure: true, sameSite: 'strict'/*, expires: new Date(Number(new Date())+ 30*1000)*/});
                res.render('home');
                break;
            default:
                res.render('404', {error: '404', alert: 'Invalid Email or Password', data: ''});
                break;
        }
    }

};

module.exports = {
    localLogin
}
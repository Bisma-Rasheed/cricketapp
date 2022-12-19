require('dotenv').config();

module.exports = (app, User, passport, userProfile) => {
    const fbID = process.env.FB_APP_ID;
    const fbKey = process.env.FB_APP_KEY;
    const FacebookStrategy = require('passport-facebook');
    passport.use(new FacebookStrategy({
        clientID: '573442417585613',
        clientSecret: '48eb95e2904b73b5462426d1eed10beb',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, done){
        userProfile=profile;
        return done(null, userProfile);
    }
    ));

    //facebook auth route
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' })); //when user logs in through facebook

    //callback
    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { failureRedirect: '/'}),
        async(req, res) => {
            let data = await User.findOne({
                where: {
                    email: userProfile.emails[0].value
                }
            });
            if(data==null)
            {
                console.log('I am registering the user through facebook');
                try
                {
                    let data = await User.create({
                        username: userProfile.displayName,
                        email: userProfile.emails[0].value,
                        password: ''
                    });
                    res.render('prompt', {data: 2});
                }
                catch(e){
                    res.render('404', {error: '404', alert: e, data:''});
                }
  
            }
            //if exists then login
            else{
                console.log('I am logging in the user through facebook');
                res.render('home');
            }
        })
};
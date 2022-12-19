module.exports = (app, User, passport, userProfile) => {
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const GOOGLE_CLIENT_ID = '75408644288-i2n6n14a46cersphjff6t0nlngn7drid.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET = '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';
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
            
        },
        function(accessToken, refreshToken, profile, done) {
            userProfile=profile;
            return done(null, userProfile);
        }
    ));


    //google auth route
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] })); //if user registers or logs in through google
    app.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/'}),
        async (req, res) => {
            // full authentication, redirect success.

            //to check if user already exist
            let data = await User.findOne({
                where: {
                    email: userProfile.emails[0].value
                }
            });
            //if doesn't exist then registration
            if(data==null)
            {
                console.log('I am registering the user through google');
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
                console.log('I am logging in the user through google');
                res.render('home');
            }
                  
    });

};
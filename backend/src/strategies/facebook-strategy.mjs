import passport from "passport";
import { Strategy } from "passport-facebook" ;

export default passport.use(
    new Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET ,
        callbackURL: "http://localhost:3000/api/auth/facebook/callback",
        scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {

        let findUser;
        try {
            findUser = await FacebookUser.findOne({ googleId: profile.id })
        } catch (err) {
            return done(err, null)
        }

        try {
            if (!findUser) {
                const newUser = new GoogleUser({
                    facebookId: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                });
                const newUserSaved = await newUser.save()
                return done(null, newUserSaved)
            }
            return done(null, findUser)
        } catch (err) {
            return done(err, null)
        }
    })

)
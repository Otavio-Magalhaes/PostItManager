import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { GoogleUser } from "../mongoose/schemas/google-user.mjs";


export default passport.use(

 
    new Strategy({
        
        clientID: process.env.GOOGLE_CLIENT_ID ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
        scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {

        
        let findUser;
        try {
            findUser = await GoogleUser.findOne({ googleId: profile.id })
        } catch (err) {
            return done(err, null)
        }

        try {
            if (!findUser) {
                const newUser = new GoogleUser({
                    googleId: profile.id,
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
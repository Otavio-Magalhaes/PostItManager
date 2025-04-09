import { User } from "../../mongoose/schemas/user.mjs";
import { GoogleUser } from "../../mongoose/schemas/google-user.mjs";

export function setupPassportSerialization(passport) {
    passport.serializeUser((user, done) => {
        const userType = user.googleId ? "google" : "local";  // se tiver googleId, é do Google
        done(null, { id: user.id, type: userType });
    });

    passport.deserializeUser(async (obj, done) => {
        try {
            let user;
            if (obj.type === "google") {
                user = await GoogleUser.findById(obj.id);
            } else {
                user = await User.findById(obj.id);
            }
            
            return user ? done(null, user) : done(null,null)
        } catch (err) {
            done(err, null);
        }
    });
}
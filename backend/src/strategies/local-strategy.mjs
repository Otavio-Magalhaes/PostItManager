import passport from "passport";
import { Strategy } from "passport-local";
import {User} from "../mongoose/schemas/user.mjs"





export default passport.use(
    new Strategy({usernameField: "email"}, async (email, password,done)=>{
        try{
            const findUser = await User.findOne({email});

            if(!findUser) throw new Error("Usuario nao encontrado")
            console.log(findUser)
            if(findUser.password !== password) throw new Error("Senha Incorreta!")

            done(null,findUser)
        } catch(err){
            return done(err,null)
        }
    })
)
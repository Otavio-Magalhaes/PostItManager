import passport from "passport";
import { Strategy } from "passport-local";
import {User} from "../mongoose/schemas/user.mjs"
import bcrypt from "bcrypt"




export default passport.use(
    new Strategy({usernameField: "email"}, async (email, password,done)=>{
        try{
            const findUser = await User.findOne({email});

            if(!findUser) throw new Error("Usuario nao encontrado")
            console.log(`senha digitada ${password}`)
            console.log(`senha do banco de dados: ${findUser.password}`)

            const isMatch = await bcrypt.compare(password,findUser.password )
            if(!isMatch) throw new Error("Senha Incorreta!")

            done(null,findUser)
        } catch(err){
            return done(err,null)
        }
    })
)
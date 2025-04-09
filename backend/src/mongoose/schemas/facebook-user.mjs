import mongoose from "mongoose";
import { type } from "os";

const  {Schema} = mongoose

//criando o schema de usuario, so sera cadastrado o usuario que tiver nesse formato.
const facebookUserSchema = new Schema({
    facebookId:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    }
})

export const FacebokUser =  mongoose.model("FacebokUser", facebookUserSchema);

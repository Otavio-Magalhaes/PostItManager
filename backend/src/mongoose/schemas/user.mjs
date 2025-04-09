import mongoose from "mongoose";

const  {Schema} = mongoose

//criando o schema de usuario, so sera cadastrado o usuario que tiver nesse formato.
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
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

export const User =  mongoose.model("User", userSchema);

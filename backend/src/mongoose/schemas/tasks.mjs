import mongoose from "mongoose";

const  {Schema} = mongoose

//criando o schema de usuario, so sera cadastrado o usuario que tiver nesse formato.
const taskSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    status: {
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    x:{
        type: mongoose.Schema.Types.Int32,
        required: true
    },
    y:{
        type: mongoose.Schema.Types.Int32,
        required: true
    },
    color:{
        type: String,
        required: true
    }


}, { timestamps: true })

export const Task =  mongoose.model("Task", taskSchema)
import 'dotenv/config'
import express from "express";
import cors from "cors";
import session from "express-session"
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import routes from "./routes/index.mjs"
import { setupPassportSerialization } from "./strategies/serializers/user-serializer.mjs";
import './strategies/local-strategy.mjs';
import './strategies/google-strategy.mjs';



const PORT = process.env.PORT || 3000;
const app = express()

mongoose.connect("mongodb://localhost:27017/task_manager")
.then(()=> console.log("Conectado"))
.catch((err)=>console.log(err)) 


// Adicione isso antes das suas rotas
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
  }));

app.use(express.json())

setupPassportSerialization(passport);
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

app.listen(PORT, () =>{
    console.log("Rodando na Porta 3000.")
    console.log("acesse: http://localhost:3000/")
})


app.get("/", (request, response) => {
    console.log(request.session)
    console.log(request.session.id)
    request.session.visited = true
    response.cookie("hello", "world", { maxAge: 60000 * 60 })
    response.status(201).send({ msg: "hello" })
  })

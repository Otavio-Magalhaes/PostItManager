import { Router } from "express";
import mongoose from "mongoose";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {ValidateUser} from "../utils/validationSchemas.mjs"
import {User} from "../mongoose/schemas/user.mjs"

const router = Router()

router.post("/api/users/", checkSchema(ValidateUser), async (request,response)=>{
   //validationResult valida os dados do request, caso ache erro ele aloca em result, se nao tiver erro result e vazio.
    const result = validationResult(request)
    if(!result.isEmpty()) return response.status(400).send(result.array())
    
    // mtchedData pega os dados ja validados e corretos e aloca dentro de data
    const data = matchedData(request)

    const newUser = new User(data)

    try{
        //estou tentando salvar o usuario novo dentro de saveduser, fazendo isso e colocando o newUser.Save() ja salva ate no bando de dados
        // porem precisa ser asyncrono entao preciso colocar o asyn antes do request e response e aqui colcoar o await
        const savedUser = await newUser.save()
        return response.status(201).send(savedUser)
    }catch(err){
        return response.status(400).send(`Error ${err}`)
    }
})


router.get("/api/users",(request,response)=>{
    return response.status(200).send({msg:"Usuarios vao ser mostrados aqui"})
})

export default router
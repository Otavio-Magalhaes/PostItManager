import { Router } from "express";
import mongoose from "mongoose";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {ValidateUser} from "../utils/validationSchemas.mjs"
import {User} from "../mongoose/schemas/user.mjs"
import bcrypt from "bcrypt"
const router = Router()

router.post("/api/users/", checkSchema(ValidateUser), async (request,response)=>{
    const result = validationResult(request)
    if(!result.isEmpty()) return response.status(400).send(result.array())
    
    const data = matchedData(request)
    const saltRounds = 10
    const password = data.password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({...data, password: hashedPassword})
    console.log(newUser)

    try{
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
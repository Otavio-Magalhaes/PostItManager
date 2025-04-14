import { response, Router } from "express";
import {checkAuth} from "../middlewares/checkAuth.mjs"
import { checkSchema, matchedData, validationResult } from "express-validator";
import { ValidateTask } from "../utils/validationSchemas.mjs";
import { Task } from "../mongoose/schemas/tasks.mjs";
import { appendFile } from "fs";
import mongoose from "mongoose";


const router = Router()

router.get("/api/tasks",checkAuth, async (request,response)=>{
    try{
        const userId = request.user.id
        const findTasks = await Task.find({user: userId})
        return response.status(200).send(findTasks ?? []) 
    }catch(err){
        return response.status(400).send(err)
    }
})
router.get("/api/tasks/stats", checkAuth, async(request,response)=>{
    try{
        const userId = request.user.id
        const totalTasks = await Task.countDocuments({user: userId})
        const totalTasksCompletas = await Task.countDocuments({user:userId, status: true})
        const totalPendentes = await Task.countDocuments({user: userId, status: false})
        const ultimaTaksCompletada = await Task.findOne({status: true}).sort({createdAt: -1}).select({ "createdAt": 1 })
        
        
        
        
        return response.status(200)
        .json({
            totalTasks,
            totalTasksCompletas,
            totalPendentes,
            ultimaTaksCompletada: ultimaTaksCompletada ? ultimaTaksCompletada.createdAt : "Não possui tarefas concluidas ainda."
        })



    } catch(err){
        return response.status(400).json({ error: err.message });
    }
})

router.get("/api/tasks/:id", checkAuth, async(request,response)=>{
    try{
        const {id} = request.params;
        const findTask = await Task.findById(id);
        if(!findTask) return response.status(404).send({msg:"tarefa nao encontrada"})

        return response.status(200).send(findTask)

    }catch(err){
        return response.status(404).send(err)
    }
})



router.post("/api/tasks/create", checkAuth, checkSchema(ValidateTask), async (request,response)=>{
    const result = validationResult(request)
    if(!result.isEmpty()) return response.status(400).send(result.array())
    const data = matchedData(request)
    const userId = request.user.id
    const newTask = new Task({...data, user: userId})

    try{
        const saveTask = await newTask.save()
        return response.status(201).send(saveTask)
    }catch(err){
        return response.status(400).send(`Error ${err}`)
    }
})


router.patch("/api/tasks/update/:id", checkAuth, async (request, response)=>{
    try{
        const {id} = request.params
        const body = request.body

        const updatedTask = await Task.findByIdAndUpdate(id, body, {new: true})
        if (!updatedTask) {
            return response.status(404).send({ msg: "A tarefa não foi encontrada." });
        }
        return response.status(200).send(updatedTask);
      
    }catch(err){
        return response.status(500).send(err)
    }
})
 
router.delete("/api/tasks/:id",checkAuth,async(request,response)=>{
    try{
        const {id} = request.params
        const deletedTask = await Task.findByIdAndDelete(id)
        if(!deletedTask) return response.status(404).send({ msg: "A tarefa não foi encontrada." });

        return response.status(200).send(deletedTask);

    }catch(err){
        return response.status(400).send(err)
    }
} )

export default router
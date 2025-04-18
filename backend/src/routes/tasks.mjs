import { Router } from "express";
import {checkAuth} from "../middlewares/checkAuth.mjs"
import { check, checkSchema, matchedData, validationResult } from "express-validator";
import { ValidateTask } from "../utils/validationSchemas.mjs";
import  Task  from "../mongoose/schemas/tasks.mjs";
import { appendFile } from "fs";
import mongoose from "mongoose";
import Board from "../mongoose/schemas/board.mjs"; 


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

router.get("/api/tasks/board/:boardId", checkAuth, async(request, response)=>{
    try{const {boardId} = request.params;
    const findBoard = await Board.findById(boardId)
    const userId = request.user.id
    console.log(`Usuario logado: ${userId}`)
    console.log(findBoard)
    if(userId !== String(findBoard.owner)) return response.status(401).json({msg: "Não Autorizado a acessar este board."})
    const tasks = await Task.find({board: findBoard.id})
    return response.status(200).send(tasks)
    }catch(err){
        return response.json(500).send("Erro interno do Servidor!")
    }
})


router.post("/api/tasks", checkAuth, checkSchema(ValidateTask), async (request,response)=>{
    const result = validationResult(request)
    if(!result.isEmpty()) return response.status(400).send(result.array())
    const data = matchedData(request)
    const userId = request.user.id
    const newTask = new Task({
        title: data.title,
        description: data.description,
        status: data.status,
        user: userId,
        x: data.x,
        y: data.y,
        color: data.color,
        board: data.board
    })

    try{
        const saveTask = await newTask.save()
        return response.status(201).send(saveTask)
    }catch(err){
        return response.status(400).send(`Error ${err}`)
    }
})


router.patch("/api/tasks/:id", checkAuth, async (request, response)=>{
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
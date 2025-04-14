import {response, Router} from "express"
import mongoose from "mongoose"
import { checkAuth } from "../middlewares/checkAuth.mjs"
import { checkSchema, matchedData, validationResult } from "express-validator"
import { ValidateBoard } from "../utils/validationSchemas.mjs"
import Board from "../mongoose/schemas/board.mjs"

const router = Router()

router.post("/api/board/create", checkAuth, checkSchema(ValidateBoard) ,async (request,response)=>{
  const result = validationResult(request)
  if(!result.isEmpty()) return response.status(400).send(result.array())
  const data = matchedData(request)
  console.log(data)
  const userId = request.user.id

  const newBoard = new Board({ 
    title: data.title,
    description: data.description,
    owner: userId, 
    members:[userId], 
    tasks:[]
  })
  try {
    const savedBoard = await newBoard.save()
    return response.status(201).json({savedBoard})
  } catch (err) {
    return response.status(500).json({ message: "Erro ao criar o board." });
  }

})


router.get("/api/board",checkAuth ,async (request,response)=>{
  console.log("Dentro do Board")
  const userId = request.user.id;
  console.log(userId)
  try {
    const findBoards = await Board.find({members: (userId)}).sort({ createdAt: -1 });
    console.log(findBoards)
    if (findBoards.length === 0) {
      return response.status(404).send("Nenhum board encontrado");
    }
    response.status(200).send(findBoards)
  } catch (err) {
    return response.status(500).send(`Error: ${err}`);
  }
  
})

router.get("/api/board/:id", checkAuth, async (request,response)=>{
  try {
    const {id} = request.params
    const findBoard = await Board.findById(id)
    console.log(findBoard) 
    return response.status(200).send(findBoard)
  } catch (err) {
    return response.status(404).send("Nenhum board encontrado");
  }
})

router.patch("/api/board/:id", checkAuth, async(request, response)=>{
  try {
    const {id} = request.params
    const userId = request.user.id
    const body = request.body

    if(!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ msg: "ID do Board inválido." }); 
    
    const board = await Board.findById(id)
    if(!userId ===board.owner) return response.status(401).json({msg: "Você não tem autorização para alterar o Board."})

    if(body.createdAt || body.owner || body__id || body.id) return response.status(401).json({msg: "Campos não autorizados para alteração."})
    
    const allowedFilds = ["title", "description", "members", "tasks"]
    const bodyKeys = Object.keys(body)

    const updatedBoard = await Board.findByIdAndUpdate(id, body, {new:true})
    console.log(updatedBoard)
    if(!updatedBoard) return response.status(404).json({msg: "Board Não Encontrado!"})

    return response.status(200).send(updatedBoard)
  } catch (err) {
    return response.status(500).send(err)
  }
})

export default router
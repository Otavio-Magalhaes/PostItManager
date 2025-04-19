import mongoose from "mongoose"
import {Router } from "express"
import { checkAuth } from "../middlewares/checkAuth.mjs"
import { checkSchema, matchedData, validationResult } from "express-validator"
import { ValidateBoard } from "../utils/validationSchemas.mjs"
import Board from "../mongoose/schemas/board.mjs"
import Project from "../mongoose/schemas/project.mjs"
import Task  from "../mongoose/schemas/tasks.mjs"
import checkBodyBoard from "../middlewares/checkBodyBoard.mjs"

const router = Router()

router.post("/api/boards", checkAuth, checkSchema(ValidateBoard), async (request, response) => {
  const result = validationResult(request)
  if (!result.isEmpty()) return response.status(400).send(result.array())
  const data = matchedData(request)
  const userId = request.user.id


  
  const projectExist = await Project.findById(data.project)

  if(!projectExist) return response.status(404).json({msg: "Passe um projeto valido para a criacao do board."})

  const newBoard = new Board({
    title: data.title,
    description: data.description,
    owner: userId,
    members: [userId],
    project: data.project
  })
 
  try {
    const savedBoard = await newBoard.save()
    return response.status(201).json({ savedBoard })
  } catch (err) {
    return response.status(500).json({ message: "Erro ao criar o board." });
  }

})


router.get("/api/boards", checkAuth, async (request, response) => {
  const userId = request.user.id;
  try {
    const findBoards = await Board.find({ members: (userId) }).sort({ createdAt: -1 });
    if (findBoards.length === 0) {
      return response.status(200).json([]);
    }
    response.status(200).send(findBoards)
  } catch (err) {
    return response.status(500).send(`Error: ${err}`);
  }

})

router.get("/api/boards/:id", checkAuth, async (request, response) => {
  try {
    const { id } = request.params
    const userId = request.user.id
    const findBoard = await Board.findById(id)
    const tasks = await Task.find({ board: id})
    const findProject = await Project.findById(findBoard.project)
    if(!findProject) return response.status(404).send({msg: "Projeto não encontrado!"})
    if(!findBoard.members.includes(userId)) 
      return response.status(403).json({msg:"voce não tem permissão para acessar esse board"})
    return response.status(200).json({findBoard, tasks})
  } catch (err) {
    return response.status(500).send({msg: "Erro interno no Servidor"})
  }
})

router.patch("/api/boards/:id", checkAuth, checkBodyBoard, async (request, response) => {
  try {
    const { id } = request.params
    const userId = request.user.id
    const body = request.body
    //verifica se o id esta sendo passadoo corretamente
    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ msg: "ID do Board inválido." });

    const board = await Board.findById(id)

    if (userId !== board.owner) return response.status(401).json({ msg: "Você não tem autorização para alterar o Board." })

    const updatedBoard = await Board.findByIdAndUpdate(id, body, { new: true })

    if (!updatedBoard) return response.status(404).json({ msg: "Board Não Encontrado!" })

    return response.status(200).send(updatedBoard)

  } catch (err) {
    return response.status(500).json({ msg: "Erro no servidor." });
  }
})


router.delete("/api/boards/:id", checkAuth, async (request, response) => {
  try {
    const { id } = request.params
    const userId = request.user.id
    if (!mongoose.Types.ObjectId.isValid(id)) 
      return response.status(400).json({ msg: "ID do Board inválido." });

    const board = await Board.findById(id)
    if(!board) 
      return response.status(404).json({msg:"Board não encontrado."})

    if (userId !== board.owner) 
      return response.status(401).json({ msg: "Você não tem autorização para Deletar o Board." })

    if (board.tasks.length > 0) 
      return response.status(400).json({ msg: "Delete todas as tasks para conseguir deletar o Board." })
    
    const deletedBoard = await Board.findByIdAndDelete(id)
   
   
    return response.status(200).send(`O Board '${deletedBoard.title}' foi deletado com sucesso`)
  } catch (err) {

    return response.status(500).json({ msg: "Erro no servidor." });
  }
})

export default router
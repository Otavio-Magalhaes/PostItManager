import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.mjs";
import Project from "../mongoose/schemas/project.mjs";
import { ValidateProject } from "../utils/validationSchemas.mjs";
import { matchedData, validationResult } from "express-validator";
import checkBodyProject from "../middlewares/checkBodyProject.mjs";
import Project from "../mongoose/schemas/project.mjs";

const router = Router()

router.get("/api/projects", checkAuth, async (request, response) => {
  const userID = request.user.id
  try {
    const findProjects = await Project.find({ members: userID, status: "ativo" })
    if (!findProjects) response.status(400).json({ msg: "Este Usuario nao possui nenhum projeto ativo." })

    response.status(200).send(findProjects)
  } catch (err) {
    console.log(err);
    response.status(500).json({ msg: "Erro interno do Servidor" })
  }
})

router.get("/api/project/:id", checkAuth, async (request, response) => {
  try {
    const { id } = request.params
    const userID = request.user.id
    const findProject = await Project.findById(id)
    if (!findProject) return response.status(404).send({ msg: "Projeto não encontrado!" })
    if (!findProject.members.includes(userID)) return response.status(403).send("Você não possui permissão para acessar esse projeto.")
    return response.status(200).send(findProject)
  } catch (err) {
    return response.status(500).send({ msg: "Erro interno no Servidor" })
  }

})



router.post("/api/projects", checkAuth, ValidateProject, async (request, response) => {
  const result = validationResult(request)
  if (!result.isEmpty()) response.status(400).send(result.array())

  const data = matchedData(request)
  const userID = request.user.id

  const newProjet = new Project({
    title: data.title,
    description: data.description,
    status: "ativo",
    owner: userID,
    members: [userID]
  })

  try {
    const savedProject = await newProjet.save()
    return response.status(201).json({ savedProject })
  } catch (err) {
    return response.status(500).json({ msg: "Erro interno do servidor." })
  }
})


router.patch("/api/projects/:id", checkAuth, checkBodyProject, async (request, response) => {
  try {
    const { id } = request.params
    const userID = request.user.id
    const body = request.body

    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ msg: "ID do Board inválido." });
    
    const project = await Project.findById(id)
    if(userID !== project.owner) return response.status(401).json({ msg: "Você não tem autorização para alterar o Projeto." })

    const updatedProject = await Project.findByIdAndUpdate(id, body, {new: true})

    if(!updatedProject) return response.status(404).json({msg: "Projeto não encontrado!"})
    
    return response.status(200).send(updatedProject)
    
  } catch (error) {
    return response.status(500).json({msg: "Erro no servidor"})
  }

})

router.delete("/api/prokect/:id", checkAuth, async (request, response) => {
  try {
    const { id } = request.params
    const userId = request.user.id
    if (!mongoose.Types.ObjectId.isValid(id)) 
      return response.status(400).json({ msg: "ID do Board inválido." });

    const project = await Project.findById(id)
    if(!project) 
      return response.status(404).json({msg:"Project não encontrado."})

    if (userId !== project.owner) 
      return response.status(401).json({ msg: "Você não tem autorização para Deletar o Projeto." })

    if (project.boards.length > 0) 
      return response.status(400).json({ msg: "Delete todas os boads para conseguir deletar o Projeto." })
    
    const deletedProject = await Project.findByIdAndDelete(id)
   
   
    return response.status(200).send(`O Board '${deletedProject.title}' foi deletado com sucesso`)
  } catch (err) {
    console.error(err);
    return response.status(500).json({ msg: "Erro no servidor." });
  }
})

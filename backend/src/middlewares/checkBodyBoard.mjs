const allowedFilds = ["title", "description", "members", "tasks"]

export default function checkBodyBoard(request, response,next){
  const body = request.body
  
  if(body.createdAt || body.owner || body.__id || body.id) return response.status(401).json({msg: "Campos não autorizados para alteração."})
      
  const bodyKeys = Object.keys(body)
  if(bodyKeys.length === 0) return response.status(400).json({ msg: "Nenhum dado enviado para atualização!" });

  const isValidUpdate = bodyKeys.every((key)=> allowedFilds.includes(key))
  if(!isValidUpdate) return response.status(400).json({msg:"Tentativa de atualizar campos invalidos"})
  
  next()
}
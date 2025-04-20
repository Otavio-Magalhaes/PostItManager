import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.mjs"
import "../strategies/google-strategy.mjs"
import {checkAuth} from "../middlewares/checkAuth.mjs"
import { checkSchema, matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt"
import { User } from "../mongoose/schemas/user.mjs";
import {ValidateUser} from "../utils/validationSchemas.mjs"



const router = Router();

router.post("/api/auth", passport.authenticate("local"),(request,response)=>{
    const user = request.user
    response.status(200).json({
        message: "Login bem-sucedido",
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }})
}) 



router.get("/api/auth/me", checkAuth, async (request, res) => {
    res.status(200).json({ id: request.user.id, name: request.user.firstName, email: request.user.email });
});




router.get("/api/auth/check", (request, response) => {
  if (request.isAuthenticated()) {
    response.status(200).send({ authenticated: true, user: request.user });
  } else {
    response.status(401).send({ authenticated: false });
  }
});



router.get("/api/auth/google", passport.authenticate("google") ,(request,response)=>{

})

router.get("/api/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: 'http://localhost:5173/login' }), 
  (request, response)=>{
    response.status(200).redirect("http://localhost:5173/boards")
  
})


router.get("/api/auth/facebook", passport.authenticate("facebook") ,(request,response)=>{

})

router.get("/api/auth/facebook/callback", 
  passport.authenticate("facebook", { failureRedirect: 'http://localhost:5173/login' }), 
  (request, response)=>{
    response.status(200).redirect("http://localhost:5173/boards")
  
})


router.post("/api/auth/register/jwt",checkSchema(ValidateUser), async(request, response)=>{
  const result = validationResult(request)
  if(!result.isEmpty) return response.status(400).send(result.array())

  const data = matchedData(request)
  const hashedPassword = await bcrypt.hash(data.password, 10)
  data.password = hashedPassword
  const newUser = new User(data)

  try{
    const sabedUser = await newUser.save()
    return response.status(201).send({msg: "Created User"})
  }catch(err){
    return response.status(300).send(`Error ${err}`)
  }
})






router.get("/api/auth/logout", (request,response)=>{
  request.session.destroy(() => {
    response.clearCookie('connect.sid');
    response.status(200).json({ message: "Deslogado com sucesso" });
  });
})



export default router
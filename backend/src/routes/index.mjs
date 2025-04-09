import { Router } from "express";
import tasksRoutes from "./tasks.mjs"
import usersRoutes from "./users.mjs"
import authRoute from "./auth.mjs"



const router = Router()

router.use(authRoute)
router.use(usersRoutes)
router.use(tasksRoutes)



export default router
import { Router } from "express";
import tasksRoutes from "./tasks.mjs"
import usersRoutes from "./users.mjs"
import authRoute from "./auth.mjs"
import boardsRoute from "./board.mjs"


const router = Router()

router.use(authRoute)
router.use(usersRoutes)
router.use(tasksRoutes)
router.use(boardsRoute)



export default router
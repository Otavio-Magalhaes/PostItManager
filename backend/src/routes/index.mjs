import { Router } from "express";
import tasksRoutes from "./tasks.mjs"
import usersRoutes from "./users.mjs"
import authRoute from "./auth.mjs"
import boardsRoute from "./boards.mjs"
import projectsRoute from "./projects.mjs"

const router = Router()

router.use(authRoute)
router.use(usersRoutes)
router.use(boardsRoute)
router.use(tasksRoutes)
router.use(projectsRoute)



export default router

import { Router } from "express";
import { createTask, getallTasks, updateTask, deleteTask } from "../controller/taskController.js";
export const taskRouter = Router()

taskRouter.get('/', getallTasks)
taskRouter.post('/', createTask)
taskRouter.put('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)

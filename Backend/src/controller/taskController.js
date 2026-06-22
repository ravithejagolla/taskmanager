
import { Task } from '../model/taksmodel.js'

const validStatuses = ['pending', 'completed']

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body

        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newTask = await Task.create({
            title: title.trim(),
            description: description.trim(),
            status: 'pending'
        })

        return res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        })
    } catch (error) {
        return res.status(500).json({ message: 'Unable to create task', error: error.message })
    }
}

export const getallTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 })
        res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
        })
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch tasks", error: error.message })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Status must be pending or completed' })
        }

        const task = await Task.findByIdAndUpdate(id, { status }, { new: true })

        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task id' })
        }
        res.status(500).json({ message: 'Unable to update task', error: error.message })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task
        })
    } catch (error) {
        res.status(500).json({ message: "Unable to delete task", error: error.message })
    }
}
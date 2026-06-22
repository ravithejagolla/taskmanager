
import express from 'express'
import env from 'dotenv'
env.config()
import { connect } from 'mongoose'
import cors from 'cors'
import { taskRouter } from './routes/taskRouter.js'


const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/task', taskRouter)


const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI



app.listen(PORT, (async () => {
    try {
        await connect(MONGODB_URI)
        console.log(`MongoDB Connected `)
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port ${PORT}`)
}))

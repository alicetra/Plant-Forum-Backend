import express from 'express'
import cors from 'cors'
import PostRoutes from './routes/get_routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/posts',PostRoutes)

export default app
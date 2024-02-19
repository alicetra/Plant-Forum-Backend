import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post_routes.js'

const app = express()

app.use(cors())
app.use(express.json())

// Post Routes Router
app.use('/posts', postRoutes)

export default app

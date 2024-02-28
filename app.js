import express from 'express'
import cors from 'cors'
import PostRoutes from './routes/post_routes.js'
import UserRoutes from './routes/user_routes.js'


const app = express()


app.use(cors())
app.use(express.json())

// Post Routes Router
app.use('/posts', PostRoutes)
app.use('/users', UserRoutes)

export default app
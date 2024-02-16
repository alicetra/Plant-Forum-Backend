import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// Index Route
app.get('/', (req, res) => res.send({"info": "Welcome"}))

export default app

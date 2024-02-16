import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
mongoose.connect(process.env.DB_URI)
const app = express()

app.get('/', (req, res) => res.send({"info": "Welcome"}))

app.listen(4001) 
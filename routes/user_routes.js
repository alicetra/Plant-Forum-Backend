import { Router } from "express"
import UserModel from '../models/users.js'
import { connectToDatabase } from '../db.js'

connectToDatabase()
const router = Router()


export default router
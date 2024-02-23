import { Router } from "express"
import UserModel from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwt_payload_handler} from "../jwt.js"


const router = Router()

router.post('/register', async (req, res) => {
    try {
        const userInput = {
            username: req.body.username,
            // hashed input password and do 10 round of salt 
            password: await bcrypt.hash(req.body.password, 10),
            plants: req.body.plants,
            // set the profiplePicture to what the user upload or if nothing is provided default to the link
            profilePicture: req.body.profilePicture || "https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp"
        }

        const insertedEntry = await UserModel.create(userInput)
        res.status(201).send(insertedEntry)

    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {

    const userId = req.params.id

    try {
        const userInput = {
            profilePicture: req.body.profilePicture ,
            plants: req.body.plants                     
        }

        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword

        if (oldPassword && newPassword) {
            const user = await UserModel.findById(userId)

            const passwordMatch = await bcrypt.compare(oldPassword, user.password)
            if (!passwordMatch) {
                return res.status(400).json({ error: 'Incorrect old password' })
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10)
            userInput.password = hashedNewPassword
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, userInput, { new: true })

        res.status(200).json(updatedUser)

    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})



router.post('/login', async (req, res) => {
    try {
        const userInput = {
            username: req.body.username,
            password: req.body.password,
        }
        // Check if user exists
        const user = await UserModel.findOne({ username: userInput.username })
        if (!user) {
            return res.status(400).json({ error: 'User or password is invalid' })
        }

        // Check if password matches
         const isMatch = await bcrypt.compare(userInput.password, user.password)
        if (!isMatch) {
                return res.status(400).json({ error: 'User or password is invalid' })
                }
    
        //set token with custom payload with the jwt_payload_handler
        const token = jwt.sign(jwt_payload_handler(user), process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
                
        res.status(201).send({ user, token })

    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})




export default router
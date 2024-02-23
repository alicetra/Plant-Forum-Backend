import { Router } from "express"
import UserModel from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwt_payload_handler} from "../jwt.js"


const router = Router()

router.post('/register', async (req, res) => {

    // I need to save my error message in an array else I won't be able to return both error message in React and match them to the relevent component
    let Displayederrors = [];

    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username: req.body.username })
    if (existingUser) {
        Displayederrors.push('Username taken, please type a different username');
    }

    //check if password lenght is what is required
    if (req.body.password.length < 8) {
        Displayederrors.push('Password must be a minimum of 8 characters long');
    }

    // if there is any error that was saved in Displayederrors send then into an array of error to the browser
    if (Displayederrors.length > 0) {
        return res.status(400).send({ Displayederrors });
    }

    try {
        const userInput = {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
            plants: req.body.plants,
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
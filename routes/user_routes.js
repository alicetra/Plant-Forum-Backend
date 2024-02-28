import { Router } from "express"
import UserModel from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwt_payload_handler} from "../jwt.js"
import {verifyToken} from '../jwt.js'

const router = Router()

// Route to get a single user object based of the ID provided in the params
router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({error:'User Not Found'})
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Route to register / sign up
router.post('/register', async (req, res) => {

    // I need to save my error message in an array else I won't be able to return both error message in React and match them to the relevent components. 
    let Displayederrors = []

    // Check if the username field is left empty and remind user that they need to fill the field.
    if (!req.body.username) {
        // push that specific error into the collections of errors in Displayederrors array.
        Displayederrors.push('Username is required')
    }

    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username: req.body.username })
    if (existingUser) {
        Displayederrors.push('Username taken, please type a different username')
    }

    //check if password lenght is what is required
    if (req.body.password.length < 8) {
        Displayederrors.push('Password must be a minimum of 8 characters long')
    }

    // if there is any error that was saved in Displayederrors send then into an array of error to the browser
    if (Displayederrors.length > 0) {
        return res.status(400).send({ Displayederrors })
    }

    try {
        const userInput = {
            username: req.body.username,
            // hash and salt the password
            password: await bcrypt.hash(req.body.password, 10),
            plants: req.body.plants,
            // if user do not input a profile picture it will  default to the "or" hard coded image
            profilePicture: req.body.profilePicture || "https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp"
        }

        const insertedEntry = await UserModel.create(userInput)
        res.status(201).send(insertedEntry)

    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})



// Route to edit user information
router.put('/:id', verifyToken, async (req, res) => {

    const userId = req.params.id

    let Displayederrors = []

    try {

        const userInput = {
            username: req.body.username,
            profilePicture: req.body.profilePicture ,
            plants: req.body.plants                     
        }

        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword

        // Check if the username already exists
        const existingUser = await UserModel.findOne({ username: req.body.username })
        if (existingUser) {
            Displayederrors.push('Username taken, please type a different username')
        }


        if (oldPassword && newPassword) {
            const user = await UserModel.findById(userId)

            const passwordMatch = await bcrypt.compare(oldPassword, user.password)
            if (!passwordMatch) {
                Displayederrors.push('Incorrect old password')
            }

            if (req.body.newPassword.length < 8) {
                Displayederrors.push('Password must be a minimum of 8 characters long')
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10)
            userInput.password = hashedNewPassword
        }

        if (Displayederrors.length > 0) {
            return res.status(400).json({ Displayederrors })
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, userInput, { new: true })

        res.status(200).json(updatedUser)

    } catch (err) {
        res.status(400).send({ Displayederrors })
    }
})


// Route to login
router.post('/login', async (req, res) => {
    try {
        const userInput = {
            username: req.body.username,
            password: req.body.password,
        }
        // Check if user exists
        const user = await UserModel.findOne({ username: userInput.username })
        if (!user) {
            return res.status(400).json({ error: 'User or Password is invalid' })
        }

        // Check if password matches
         const isMatch = await bcrypt.compare(userInput.password, user.password)
        if (!isMatch) {
                return res.status(400).json({ error: 'User or Password is invalid' })
                }
    
        //set token with custom payload with the jwt_payload_handler and make it expired after 1h 
        const token = jwt.sign(jwt_payload_handler(user), process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
                
        res.status(201).send({ user, token })

    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})


// Route to get all users
router.get('/', async (req, res) => {
    try {
        res.send(await UserModel.find())
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})




export default router
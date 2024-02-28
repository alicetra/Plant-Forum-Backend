import { Router } from "express"
import PostModel from '../models/posts.js'
import {verifyToken} from '../jwt.js'

const router = Router()



// Route to delete a comment
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        // req.params is an object that contains route parameter values
        const entry = await PostModel.findById(req.params.id)

        if (!entry) {
            return res.status(404).send({ error: 'Entry not found' })
        }

        // check if the post is indeed just a comment, this is needed since we don't want orphans posts if a thread starter post is deleted.
        if (entry.isThreadStarter === false && entry.isComment === true) {
            const deletedEntry = await PostModel.findByIdAndDelete(req.params.id)
            if (deletedEntry) {
                res.sendStatus(204)
            } 
        } else {
            res.status(403).send({ error: 'Entry does not meet criteria' })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})


// Route to update a single post
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedEntry = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true }) //new set to true to return the updated entry
        if(updatedEntry){
            res.send(updatedEntry)
        } else {
            res.status(404).send({ error: 'Entry not found'})
        }
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
})


// Route to get a single post / comment 
router.get('/:id', async (req, res) => {
    try {
        // we populating the user array of the post since this is needed for our react post components of display who is the author of that specific post
        const entry = await PostModel.findById(req.params.id).populate('user')
        if(entry){
            res.send(entry)
        } else {
            res.status(404).send({ error: 'Entry not found'})
        }
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
})


// Route to get all posts
router.get('/', async (req, res) => {
    try {
        res.send(await PostModel.find().populate('user'))
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})


// Route to create a new post / comment
router.post('/', verifyToken, async (req, res) => {
    try {
        const createdPost = await (((await PostModel.create(req.body)).populate('user', '-password -plants')))
        res.status(201).send(createdPost)
    }
    catch (err) {
        res.status(400).send({error: err.message})
    }
})

export default router

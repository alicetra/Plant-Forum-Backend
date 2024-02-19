import { Router } from "express"
import PostModel from '../models/posts.js'


const router = Router()

// Route to get a single post / comment
router.get('/:id', async (req, res) => {
    try {
        // req.params is an object that contains route parameter values
        // :id is a route parameter. When you navigate to a URL like /60d5ecf31f4e5c5508fe8b2a, 
        // Express captures “60d5ecf31f4e5c5508fe8b2a” and stores it in req.params under the key “id”
        // since req.params.id is “60d5ecf31f4e5c5508fe8b2a”, findById(req.params.id) is equivalent to findById("60d5ecf31f4e5c5508fe8b2a"),
        // which tells mongoose to find one document in the Posts collection where the _id field is “60d5ecf31f4e5c5508fe8b2a”.
        const entry = await PostModel.findById(req.params.id)
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
        res.send(await PostModel.find())
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})


// Route to create a new post / comment
router.post('/', async (req, res) => {
    try {
        const createdPost = await (((await PostModel.create(req.body)).populate('user')))
        res.status(201).send(createdPost)
    }
    catch (err) {
        res.status(400).send({error: err.message})
    }
})


export default router
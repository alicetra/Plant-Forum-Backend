// import PostModel from '../models/posts.js'

// // Route to create a new post or comment

// export const createNewPostComment = async (req, res) => {
//     try {
//         const createdPost = await ((await PostModel.create(req.body)))
//         res.status(201).send(createdPost)
//     }
//     catch (err) {
//         res.status(400).send({error: err.message})
//     }
// }
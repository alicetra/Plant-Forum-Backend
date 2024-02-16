import mongoose from "mongoose"
import { plants } from "models/users.js"

// Posts Schema
const postsSchema = new mongoose.Schema({
    createdDateTime: { 
        type: Date, 
        required: true },
    userID: { 
        type: mongoose.ObjectId, 
        ref: 'User' },
    title: { 
        type: String, 
        required: true },
    content: {
        type: String, 
        required: true },
    image: { 
        type: String },
    parent: { 
        type: mongoose.ObjectId, 
        ref: 'Post'},
    isThreadStarter: { 
        type: Boolean, 
        required: true },
    isComment: { 
        type: Boolean, 
        required: true },
    tags: { 
        type: [String],
        required: true, 
        enum: plants },
})

// Post Model
const PostModel = mongoose.model('Post', postsSchema)

export default PostModel 
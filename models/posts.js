import mongoose from "mongoose"
import { plants } from "./users.js"

// Posts Schema
const postsSchema = new mongoose.Schema({
    createdDateTime: { 
        type: Date,
        default: Date.now, 
        required: true },
    user: { 
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
    parentID: { 
        type: mongoose.ObjectId, 
        ref: 'Post',
        default: null},
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
        
    reactions: [{ type: mongoose.ObjectId, ref: 'User' }] 
})

// Post Model
const PostModel = mongoose.model('Post', postsSchema)

export default PostModel 
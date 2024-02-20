import mongoose from "mongoose"
import { plants } from "./users.js"

// Posts Schema
const postsSchema = new mongoose.Schema({
    createdDateTime: { 
        type: Date,
        default: Date.now},
    user: { 
        type: mongoose.ObjectId, 
        ref: 'User',
        required: true},
        title: { 
            type: String, 
            // Set default title to null (for comments that don't have a title)
            default: null,
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
    // an array of userIDs object of users who have liked the post
    reactions: [ {
        type: mongoose.ObjectId, 
        ref: 'User'}
    ] 
})

// Post Model
const PostModel = mongoose.model('Post', postsSchema)


export default PostModel 
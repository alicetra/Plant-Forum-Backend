import mongoose from "mongoose"
// this import is crucial without it we cannot do populate(). Even though UserModel is not directly called in this file, it is needed for populate to work in our routes.
import UserModel from "./users.js"

// Posts Schema
const postsSchema = new mongoose.Schema({
    createdDateTime: { 
        type: Date,
        // Default is the current date and time to create the datestamp
        default: Date.now},
    user: { 
        // User ID from an existing user
        type: mongoose.ObjectId, 
        ref: 'User',
        required: true},
    title: { 
        type: String, 
        // Set default title to null (for comments that don't have a title)
        default: null, },
    content: {
        type: String, 
        required: true },
    image: { 
        // URL String
        type: String },
    parentID: { 
        // ID will be the post_id of the post that is the parent
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
        // Insert an array of strings (plant names)
        type: [String],
     },
    // An array of userID objects of thos that have liked the post
    reactions: [ {
        type: mongoose.ObjectId, 
        ref: 'User'}
    ] 
})

// Post Model
const PostModel = mongoose.model('Post', postsSchema)


export default PostModel 
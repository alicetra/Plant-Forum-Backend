import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    username: { 
      type : String,
      // Even though I set type to string I have to include cast to false or else it will cast integer input to string and accept it as a valid input 
      cast:false,
      // Match any character except white-space eg (line breaks, tabs, spaces, hard spaces)
      match: /[^\s]/,
      required: true,
      unique:true,
      minlength: 3},
    
    password: {
      type: String,
      cast: false,
      match: /[^\s]/,
      required: true,
      minlength: 8,
    },

    plants: {
      // insert an array of strings aka plants name
      type: [String],
      required: true,
    },

    profilePicture: {
      // it would be the url of the image
      type: String,
      required: true,
    }
})

const UserModel = mongoose.model('User', usersSchema)

export default UserModel 
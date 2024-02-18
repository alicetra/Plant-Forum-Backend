import UserModel from './models/users.js'
import PostModel from './models/posts.js'
import { connectToDatabase, closeConnection } from './db.js'

// Connect to database
connectToDatabase()

// Define new users to seed
const users = [
    {
        username: "sarahxxx",
        password: "password2",
        plants: ["Monstera", "ZZ plant"],
        profilePicture: "https://cdn.shopify.com/s/files/1/0997/4496/articles/shutterstock_597959525_07dcd775-31fc-4a78-b42a-4fffa0febd35.jpg?v=1588963145"
    },
    {
        username: "MichaelBarry",
        password: "password2",
        plants: ["ZZ plant"],
        profilePicture: "https://images.ctfassets.net/sfnkq8lmu5d7/3g9BQo5pU4OOvi6nNugN4n/552676f869d72f164ed20302995fb93c/2021_03-catSafePlants-AdobeStock_314908743.jpg?w=1000&h=750&q=70&fm=webp"
    },
    {
        username: "BobMarley",
        password: "password3",
        plants: ["ZZ plant"],
        profilePicture: "https://images.ctfassets.net/sfnkq8lmu5d7/3g9BQo5pU4OOvi6nNugN4n/552676f869d72f164ed20302995fb93c/2021_03-catSafePlants-AdobeStock_314908743.jpg?w=1000&h=750&q=70&fm=webp"
    }
]

// Delete any existing users
await UserModel.deleteMany()
console.log('Deleted existing users')

// Seed new users
const newUsers = await UserModel.insertMany(users) 
console.log('Added users')

// Define posts to seed
const posts = [
    {
        user: newUsers[1]._id,
        title: "How to test fertiliser?",
        content: "What tools does everyone use to test fertiliser, I need some recommendations pls",
        isThreadStarter: false,
        isComment: false,
        tags: ["Monstera"],
        // I have to grab the index of the users because I don't know the userID from the seeding file as of yet but in practice in the route we will just input the userID 
        reactions: [newUsers[0]._i, newUsers[2]._id]
    },
    {
        user: newUsers[0]._id,
        title: "How can I save this leaf?",
        content: "I don't understand why it's dying - help!!",
        image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg",
        isThreadStarter: true,
        isComment: true,
        tags: ["Monstera"],
        reactions: [newUsers[1]._id,newUsers[2]._id]
    }
]

// Delete any existing posts
await PostModel.deleteMany()
console.log('Deleted existing posts')


// Seed new posts
await PostModel.insertMany(posts)
console.log('Inserted Posts')

// Close the db connection
closeConnection();
import UserModel from './models/users.js'
import PostModel from './models/post.js'
import { connectToDatabase, closeConnection } from './db.js'

const users = [
    {
        username: "test1",
        password: "test1234",
        plants: ["Monstera", "ZZ plant"],
        profilePicture: "https://cdn.shopify.com/s/files/1/0997/4496/articles/shutterstock_597959525_07dcd775-31fc-4a78-b42a-4fffa0febd35.jpg?v=1588963145"
    },
    {
        username: "test2",
        password: "test1234",
        plants: ["ZZ plant"],
        profilePicture: "https://images.ctfassets.net/sfnkq8lmu5d7/3g9BQo5pU4OOvi6nNugN4n/552676f869d72f164ed20302995fb93c/2021_03-catSafePlants-AdobeStock_314908743.jpg?w=1000&h=750&q=70&fm=webp"
    }
]

const seedUsers = async () => {
    try {
        await UserModel.deleteMany()
        console.log('Deleted existing users')
        await UserModel.insertMany(users) 
        console.log('Added users')
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

connectToDatabase()
seedUsers()
closeConnection()
import UserModel from './models/users.js'
import PostModel from './models/post.js'
import { connectToDatabase, closeConnection } from './db.js'

const users = [
    {
        username:"test1",
        password:"test1234"
    },
    {
        username:"test2",
        password:"test1234"
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
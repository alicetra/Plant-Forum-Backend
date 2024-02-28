import app from '../app.js'
import request from 'supertest'
import { connectToDatabase } from '../db.js'
import UserModel from '../models/users.js'
// I have to import the connectTodabase in my test or else it will have  Operation 'featureds.find()` buffering timed out after 10000ms testing my routes since I need access to mongoose and in app.js we dont have that connection there
connectToDatabase()


describe("Get /users", () => {
    test('test my get /users/ that returns all the user objects in my database', async () => {
        const res = await request(app).get('/users')
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('json')
        expect(res.body).toBeInstanceOf(Array)
        res.body.forEach((user) => {
            expect(user).toEqual(
                expect.objectContaining({
                    username: expect.any(String),
                    password: expect.any(String),
                    plants: expect.any(Array),
                    profilePicture: expect.any(String),
                })
            )
        })
    })
})

describe("Get /users/:id", () => {
    test("test my get /users/:id to get a single user object", async () => {
      const userId = "65d469278aaa81f8f6af8497"
      const res = await request(app).get(`/users/${userId}`)
      expect(res.status).toBe(200)
      expect(res.header["content-type"]).toContain("json")
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toEqual(expect.objectContaining({ username: "Lumi3" }))
    })
  
    test("It should return 404 if a user does not exist", async () => {
      const wrongUserId = "65d469278aaa81f8f6af8492"
      const res = await request(app).get(`/users/${wrongUserId}`)
      expect(res.status).toBe(404)
      expect(res.header["content-type"]).toContain("json")
    })
  })


  describe('POST /login', () => {
    test('should log in a user and return a token', async () => {

        const User = {
            username: "alicetest4",
            password: "alicetest4",
            profilePicture: "https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp",
        }

        const res = await request(app)
            .post('/users/login')
            .send(User)

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("user")
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty("token")
        expect(res.header["content-type"]).toContain("json")
    })

    test('should return an error if user or password is invalid', async () => {
        const invalidUser = {
            username: "invaliduser",
            password: "invalidpassword",
        }

        const res = await request(app)
            .post('/users/login')
            .send(invalidUser)

        expect(res.status).toBe(400)
        expect(res.header["content-type"]).toContain("json")
        expect(res.body).toHaveProperty("error", "User or Password is invalid")
    })
})

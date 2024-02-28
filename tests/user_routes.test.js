import app from '../app.js'
import request from 'supertest'
import { connectToDatabase } from '../db.js'
//I have to import the connectTodabase in my test or else it will have  Operation 'featureds.find()` buffering timed out after 10000ms testing my routes since I need access to mongoose and in app.js we dont have that connection there
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
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
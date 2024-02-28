import app from "../app.js";
import request from "supertest";
import { connectToDatabase } from "../db.js";
import PostModel from "../models/posts.js";

connectToDatabase();

describe("GET /posts", () => {
	let res;
	beforeEach(async () => {
		res = await request(app).get("/posts");
	});

	test("Returns JSON with 200 status", async () => {
		expect(res.status).toBe(200);
		expect(res.header["content-type"]).toContain("json");
		expect(res.body).toBeInstanceOf(Array);
	});

	test("Posts have the correct fields populated", () => {
		expect(res.body[0]._id).toBeDefined();
		expect(res.body[0].user).toBeDefined();
		expect(res.body[0].title).toBeDefined();
		expect(res.body[0].content).toBeDefined();
		expect(res.body[0].isThreadStarter).toBeDefined();
		expect(res.body[0].isComment).toBeDefined();
		expect(res.body[0].tags).toBeDefined();
		expect(res.body[0].tags).toBeInstanceOf(Array);
	});

	test("User object is correctly populated in post", () => {
		expect(res.body[0].user).toBeInstanceOf(Object);
		expect(res.body[0].user._id).toBeDefined();
		expect(res.body[0].user.username).toBeDefined();
		expect(res.body[0].user.password).toBeDefined();
		expect(res.body[0].user.plants).toBeInstanceOf(Array);
		expect(res.body[0].user.profilePicture).toBeDefined();
	});
});

describe("GET /posts/:id", () => {
	let res;
	const postId = "65d469278aaa81f8f6af849c";

	beforeEach(async () => {
		res = await request(app).get(`/posts/${postId}`);
	});

	test("Returns JSON with 200 status", async () => {
		expect(res.status).toBe(200);
		expect(res.header["content-type"]).toContain("json");
		expect(res.body).toBeInstanceOf(Object);
	});

	test("Post has the correct data", async () => {
		expect(res.body.title).toBe("How to test fertiliser?");
		expect(res.body.isThreadStarter).toBe(true);
		expect(res.body.isComment).toBe(false);
		expect(res.body.tags).toStrictEqual(["Birds nest fern"]);
		expect(res.body.image).toBe(
			"https://res.cloudinary.com/djtgmjm16/image/upload/v1708665049/images/ctxehrewdcnustpeoayr.jpg"
		);
	});

	test("Post returns the correct user information", async () => {
		expect(res.body.user._id).toBe("65d469278aaa81f8f6af8498");
		expect(res.body.user.username).toBe("MichealBarry");
		expect(res.body.user.plants).toStrictEqual(["ZZ plant", "Aloe vera"]);
	});
});

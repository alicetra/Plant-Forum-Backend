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
	const postId = "65dfc128415135c453dedcc4";

	beforeEach(async () => {
		res = await request(app).get(`/posts/${postId}`);
	});

	test("Returns JSON with 200 status", async () => {
		expect(res.status).toBe(200);
		expect(res.header["content-type"]).toContain("json");
		expect(res.body).toBeInstanceOf(Object);
	});

	test("Post has the correct data", async () => {
		expect(res.body.title).toBe("Trouble with my Monstera");
		expect(res.body.isThreadStarter).toBe(true);
		expect(res.body.isComment).toBe(false);
		expect(res.body.tags).toStrictEqual(["Monstera"]);
		expect(res.body.image).toBe(
			"https://res.cloudinary.com/djtgmjm16/image/upload/v1709162431/images/monstera-yellow_s8ze18.jpg"
		);
	});

	test("Post returns the correct user information", async () => {
		expect(res.body.user._id).toBe("65dfb56bf946928166c6093e");
		expect(res.body.user.username).toBe("LilyGreen21");
		expect(res.body.user.plants).toStrictEqual([
			"English Ivy",
			"Lucky bamboo",
			"Umbrella tree",
			"String of pearls",
			"Peace lily",
			"Dragon tree (Dracaena)",
		]);
	});
});

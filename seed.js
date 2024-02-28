import UserModel from './models/users.js'
import PostModel from './models/posts.js'
import { connectToDatabase, closeConnection } from './db.js'

// Connect to database
connectToDatabase()

// Define posts to seed
const posts = [
	{
		user: "65dfb56bf946928166c6093e",
		title: "Trouble with my Monstera",
		content:
			"I've noticed some yellowing leaves on my Monstera plant. Any advice on how to address this issue?",
		isThreadStarter: true,
		isComment: false,
		image: "https://res.cloudinary.com/djtgmjm16/image/upload/v1709162431/images/monstera-yellow_s8ze18.jpg",
		tags: ["Monstera"],
		reactions: ["65dfb5d6f946928166c60941", "65dfb67ff946928166c60946"],
	},
	{
		user: "65dfb5d6f946928166c60941",
		title: "Calathea Care Tips",
		content:
			"I recently got a Calathea and I'm struggling to keep it happy. Does anyone have any tips for caring for Calatheas?",
		isThreadStarter: true,
		isComment: false,
		tags: ["Calathea"],
		reactions: ["65dfb56bf946928166c6093e", "65dfb6f7f946928166c60949"],
	},
	{
		user: "65dfb67ff946928166c60946",
		title: "Repotting my Peace Lily",
		content:
			"Thinking about repotting my Peace Lily but not sure if it's the right time. Any suggestions?",
		isThreadStarter: true,
		isComment: false,
		image: "https://res.cloudinary.com/djtgmjm16/image/upload/v1709162511/images/peace-lily_nmdulb.jpg",
		tags: ["Peace lily"],
		reactions: ["65dfb56bf946928166c6093e", "65dfb6f7f946928166c60949"],
	},
	{
		user: "65dfb6f7f946928166c60949",
		title: "Pruning my Fiddle Leaf Fig",
		content:
			"My Fiddle Leaf Fig has grown quite large and I think it's time for a prune. Any tips on how to prune it properly?",
		isThreadStarter: true,
		isComment: false,
		image: "https://res.cloudinary.com/djtgmjm16/image/upload/v1709162603/images/fiddle-leaf_qnw6pj.jpg",
		tags: ["Fiddle leaf fig"],
		reactions: ["65dfb56bf946928166c6093e", "65dfb67ff946928166c60946"],
	},
	{
		user: "65dfb71bf946928166c6094c",
		title: "Spider Plant Babies",
		content:
			"My Spider Plant has produced a lot of babies. Should I leave them attached or propagate them?",
		isThreadStarter: true,
		isComment: false,
		image: "https://res.cloudinary.com/djtgmjm16/image/upload/v1709162677/images/spiderplant_wwxnqx.jpg",
		tags: ["Spider plant"],
		reactions: ["65dfb5d6f946928166c60941", "65dfb6f7f946928166c60949"],
	}
];

// Delete any existing posts
await PostModel.deleteMany()
console.log('Deleted existing posts')

// Seed new posts
const newPosts = await PostModel.insertMany(posts);
console.log("Inserted Posts");

const comments = [
	{
		user: "65dfb56bf946928166c6093e",
		content:
			"I usually use a soil moisture meter to check my fertiliser levels. It's quite handy!",
		isThreadStarter: false,
		isComment: true,
		parentID: newPosts[0]._id,
		tags: [""],
		reactions: ["65dfb67ff946928166c60946"],
	},
	{
		user: "65dfb5d6f946928166c60941",
		content:
			"Your Monstera might need more sunlight. Make sure it's getting enough indirect light.",
		isThreadStarter: false,
		isComment: true,
		parentID: newPosts[0]._id,
		tags: [""],
		reactions: ["65dfb56bf946928166c6093e"],
	},
	{
		user: "65dfb67ff946928166c60946",
		content:
			"Try checking the roots of your Calathea. They can be sensitive to overwatering.",
		isThreadStarter: false,
		isComment: true,
		parentID: newPosts[1]._id,
		tags: [""],
		reactions: ["65dfb5d6f946928166c60941"],
	},
	{
		user: "65dfb6f7f946928166c60949",
		content:
			"When repotting your Peace Lily, make sure to choose a pot with good drainage.",
		isThreadStarter: false,
		isComment: true,
		parentID: newPosts[2]._id,
		tags: [""],
		reactions: ["65dfb56bf946928166c6093e"],
	},
	{
		user: "65dfb71bf946928166c6094c",
		content:
			"I usually prune my Fiddle Leaf Fig in the spring to encourage new growth.",
		isThreadStarter: false,
		isComment: true,
		parentID: newPosts[3]._id,
		tags: [""],
		reactions: ["65dfb67ff946928166c60946"],
	},
	{
		user: "65dfb56bf946928166c6093e",
		content:
			"Spider plant babies are so easy to propagate! I usually cut them off and place them in water until they grow roots.",
		isThreadStarter: false,
		isComment: true,
		parentID: newPosts[4]._id,
		tags: [""],
		reactions: ["65dfb6f7f946928166c60949"],
	},
];

// Seed new comments
await PostModel.insertMany(comments);
console.log("Inserted Comments");

// Close the db connection
closeConnection();
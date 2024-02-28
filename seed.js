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
	},
	{
		user: "65dfb71bf946928166c6094c",
		title: `String of Pearls: A Love Story`,
		content:
			"So, I’ve got this obsession with my new String of Pearls (Senecio rowleyanus). Seriously, these little green beads are like the cool kids in the succulent world.My pearls are living it up in this mug I snagged from a thrift store. And guess what? They’re thriving!",
		image: "https://www.sublimesucculents.com/wp-content/uploads/2022/03/string-of-pearls-in-yellow-pot.jpg",
		isThreadStarter: true,
		isComment: false,
	},
	{
		user: "65dfb752f946928166c60956",
		title: "SOS: My Maranta Is Wilting!",
		content: `Hey fellow plant enthusiasts! 🌿 I’m in a bit of a panic here. My beloved Prayer Plant (Maranta leuconeura) seems to be on the brink of plant heaven, and I need your green thumbs to help me out. 😢
        
        Background: I’ve had my Maranta for a few months now, and we were getting along splendidly. But lately, it’s been acting like a drama queen – leaves drooping, yellowing, and generally looking miserable. I’ve tried whispering sweet nothings to it, but alas, no improvement.
        
        Possible Culprits?

        Overwatering: I confess, I might have drowned it a bit. 
        Lighting: My Maranta lives near a window, but maybe it’s too much direct sunlight? 
        Nutrients: I haven’t fed it in a while. Maybe it’s hangry? 
        Humidity: I live in a dry climate, I love my plants but in this economy I'm not sure I can uproot myself and change that T.T . 

        Please, fellow plant whisperers, lend me your wisdom! I don’t want my Maranta to become a botanical ghost. 🙏`,

		image: "https://cdn.mos.cms.futurecdn.net/H7M33JUzxMgmLzXccw6LX-1024-80.png.webp",
		isThreadStarter: true,
		isComment: false,
	},
	{
		user: "65dfb803f946928166c6095b",
		title: "ZZ Plant: The Immortal Prank Gift",
		content: `Hey fellow plant peeps! 🌿🎉

        Picture this: my birthday rolls around, and my bestie, Lily, hands me a gift. Wrapped in shiny green paper, it’s like a botanical mystery waiting to unfold. I tear it open, and there it is the ZZ plant. But not just any ZZ plant. Oh no, this one’s the ZZ Raven, the goth cousin of the plant world.

        Now, let me set the scene. Lily knows I’m a plant nerd. I’ve got a jungle in my living room, and my Instagram is basically a foliage gallery. So, she thinks it’s hilarious to gift me a ZZ Raven a plant that’s practically immortal. You know, the kind that laughs at death and says, “Is that all you got?”

        I stare at the ZZ Raven, its dark green leaves winking at me. It’s like the plant version of a rebellious teenager with a permanent eye roll. And that’s how I became the proud owner of the ZZ Raven. I place it on my windowsill, and it just sits there, unimpressed. No growth spurt, no dramatic flair. It’s like the plant equivalent of a moody poet—introspective and brooding.
        So, if you ever get a ZZ Raven as a joke, embrace it. It’s the Chuck Norris of houseplants. It’ll outlive us all, sipping its herbal tea, judging our mortal struggles. And when the apocalypse comes, guess who’ll be left standing? Yep, ZZ Raven, probably wearing shades.`,
		image: "https://media.greg.app/cGxhbnQtZGItcGhvdG9zL3p6X3BsYW50X2JsYWNrX3JhdmVuLmpwZw==?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000",
		isThreadStarter: true,
		isComment: false,
	},
	{
		user: "65dfb87cf946928166c6095e",
		title: "My Venus Flytrap is my pride",
		content: `So, let me drop some knowledge bombs about my Venus flytrap, aka the Green Marvel. It’s not your average houseplant. It’s like having a pet tiger, but with chlorophyll.

        Fang the Fearless: My Venus flytrap’s name? Fang. Because those little jaws? They snap shut faster than my ex when I mentioned commitment. Fang’s all, “Bring me bugs, bro!” So, I toss in a fruit fly, and it’s like, “Is that all you got? I’ve eaten bigger bugs than this.” Seriously, Fang’s got an ego bigger than its trap.
        Immortality Mode: Forget water schedules. Fang’s like, “Water? Nah, I’ll just photosynthesize.”  I’ve left it in the dark for weeks, and it’s still standing there, judging me. I half expect it to say, “I survived the Ice Age, pal. Your Netflix binge won’t faze me.”
        Drama Queen Vibes: Fang’s got this diva attitude. It’s like, “I won’t eat unless you play smooth jazz.” So, there I am, serenading my flytrap with Kenny G. Meanwhile, Fang’s side-eyeing me, critiquing my taste in music. “Dude, switch to jazz fusion,” it seems to say. I’m waiting for it to demand a tiny monocle.
        Roommate Goals: Fang’s my green roommate now. We share secrets, dreams, and occasional insect snacks. It’s like having a silent partner in my Netflix marathons. And when the apocalypse hits, guess who’ll be thriving? Yep, Fang, probably sipping herbal tea and judging humanity’s choices.
        So, next time you see a Venus flytrap, give it a nod. It’s not just a plant; it’s a botanical legend. Fang’s out there, plotting world domination, and I’m here for it.

        Stay fly, my chlorophyll-loving compadres! 🌱✨`,

		image: "https://www.californiacarnivores.com/cdn/shop/files/IMG-8378.jpg?v=1693775872",
		isThreadStarter: true,
		isComment: false,
	},
	{
		user: "65dfb8b8f946928166c60961",
		title: "My Aloe Vera saved my life",
		content: `So there I was, folks, in my cozy little kitchen, channeling my inner Gordon Ramsay (minus the British accent and the occasional expletives). I’d decided to whip up a batch of spicy chili because, you know, life’s too short for bland food. But little did I know that my aloe vera plant was about to become my kitchen superhero.

        Now, let’s set the scene: I’m chopping these fiery red chilies like a culinary ninja. The kitchen smells like a dragon’s breath, and I’m feeling all chef-y. But then—bam!—I sneeze. My hand slips, and suddenly, I’m doing the “hot stove dance.” You know the one: equal parts panic, pain, and regret.

        My palm is sizzling like a forgotten pizza slice left in the oven. I reach for the cold water tap, but it’s playing hard to get. That’s when it hits me: my aloe vera plant! It’s sitting there on the windowsill, looking all innocent and green. I swear it winked at me. (Yes, plants can totally wink. Don’t argue with me on this.)

        I rush over, pluck a thick aloe leaf, and slice it open. The gel spills out like it’s auditioning for a skincare commercial. I apply it to my burn, and—holy guacamole—it’s like aloe vera whispered, “Fear not, my spicy amigo. I gotchu.”

        The pain subsides, and the gel forms this protective layer. I love this plant I will never regret taking care of it and growing it. May the Aloe Vera ownerships skyrocket, everyone deserve to have a savior in their arsenal`,
		isThreadStarter: true,
		isComment: false,
	},
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
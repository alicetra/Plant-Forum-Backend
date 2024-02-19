import mongoose from 'mongoose'

//setting our plants selections that user can pick from that they have 
export const plants = [
	"Aloe vera",
	"Birds nest fern",
	"Boston fern",
	"Calathea",
	"Cast iron plant",
	"Chinese evergreen",
	"Devils ivy (Pothos)",
	"Dragon tree (Dracaena)",
	"English Ivy",
	"Fiddle leaf fig",
	"Flamingo lily (Anthurium)",
	"Jade plant",
	"Kentia palm",
	"Lavender",
	"Lucky bamboo",
	"Maidenhair fern",
	"Money tree (Pachira aquatica)",
	"Monstera",
	"Orchid",
	"Peace lily",
	"Philodendren",
	"Prayer plant (Maranta)",
	"Rubber plant (Ficus elastica)",
	"Snake plant (Sansevieria)",
	"Spider plant",
	"String of pearls",
	"Swiss cheese plant (Monstera deliciosa)",
	"Umbrella tree",
	"Venus flytrap",
	"ZZ plant",
];

const usersSchema = new mongoose.Schema({
    username: { 
      type : String,
      // Even though I set type to string I have to include cast to false or else it will cast integer input to string and accept it as a valid input 
      cast:false,
      // Match any character except white-space eg (line breaks, tabs, spaces, hard spaces)
      match: /[^\s]/,
      required: true,
      unique:true,
      minlength: 3},
    
    password: {
      type: String,
      cast: false,
      match: /[^\s]/,
      required: true,
      minlength: 8,
    },

    plants: {
      // insert an array of strings aka plants name
      type: [String],
      required: true,
      //if user provide in their array a plant name that is not in the plantEnum array it throws an error
      enum: plants,
    },

    profilePicture: {
      // it would be the url of the image
      type: String,
      required: true,
    }
})

const UserModel = mongoose.model('User', usersSchema)

export default UserModel 
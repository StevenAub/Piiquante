const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SauceProduct = new Schema({
  userId: { type: String, required: true },
  name: { type: String, unique: true, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false, default: [] },
  usersDisliked: { type: Array, required: false, default: [] }
});

module.exports = mongoose.model("Sauce", SauceProduct);

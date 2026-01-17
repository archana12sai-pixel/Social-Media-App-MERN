const mongoose = require("mongoose");
module.exports = mongoose.model("Post", new mongoose.Schema({
  userId: String,
  desc: String,
  likes: Array
},{timestamps:true}));

const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async(req,res)=>{
 const post = new Post(req.body);
 res.json(await post.save());
});

router.get("/", async(req,res)=>{
 res.json(await Post.find());
});

module.exports = router;

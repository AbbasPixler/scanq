const router = require("express").Router();
const Post = require("../models/Post");
const Shop = require("../models/Shop");

//Create Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Post
/* 
1. find post
2. compare postuser/username 
 */
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});

//Delete post by id
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been delete");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});

//GET post
router.get("/:id", async (req, res) => {
  try {
    const postDetail = await Post.findById(req.params.id);
    // const username = postDetail.username
    // const shopDetail = await Shop.find({username:username})
     
    // const data = ({          
    //   postDetail: postDetail,
    //   shopDetail: shopDetail,          
    // })
    res.status(200).json(postDetail);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
      let posts;
    if(username) {
      posts = await Post.find({username})
     // console.log(posts)
    } else if (catName) {
      posts = await Post.find({categories: {
        $in:[catName]
      }})
      //console.log(posts)
    } else {
      posts = await Post.find()
     // console.log(posts)
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET limit POSTS
router.get("/getposts/limitation", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
      let posts;
    if(username) {
      posts = await Post.find({username}).limit(12).sort({"createdAt":-1})
     // console.log(posts)
    } else if (catName) {
      posts = await Post.find({categories: {
        $in:[catName]
      }}).limit(12)
      //console.log(posts)
    } else {
      posts = await Post.find().limit(12).sort({createdAt:-1});
     // console.log(posts)
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

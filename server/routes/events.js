const router = require("express").Router();
const Event = require("../models/Event");
//const Shop = require("../models/Shop");

//Create Post
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Post
/* 
1. find post
2. compare postuser/username 
 */
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         const updatedPost = await Post.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedPost);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can update only your post !");
//     }
//   } catch (err) {

//     res.status(500).json(err);
//   }
// });

//Delete post by id
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been delete");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post !");
//     }
//   } catch (err) {

//     res.status(500).json(err);
//   }
// });

//GET post
router.get("/:id", async (req, res) => {
  try {
    const eventDetail = await Event.findById(req.params.id);
    // const username = postDetail.username
    // const shopDetail = await Shop.find({username:username})
     
    const data = ({          
      eventDetail: eventDetail,        
    })
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  // const username = req.query.user;
  // const catName = req.query.cat;
  try {
      let events;
      events = await Event.find()
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

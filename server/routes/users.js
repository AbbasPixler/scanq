const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE user

router.put("/:id", async (req, res) => {
  console.log(req.body)
  
    if (req.body.userId === req.params.id) {
      let data = {}
      data.email = req.body.email
      data.username = req.body.username
      if (req.body.password) {
       
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(req.body.password, salt);
      }
      if(req.body.profilePic){
        data.profilePic = req.body.profilePic
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          $set: data,
        },
        { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You are not authorized");
    }
  });
// router.put("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     try {
//       const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       },
//       { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(401).json("You are not authorized");
//   }
// });

//DELETE user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("You are not authorized");
  }
});

//GET user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL user
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
      let users;
    if(username) {
      users = await User.find({username})
    } else if (catName) {
      users = await User.find({categories: {
        $in:[catName]
      }})
    } else {
      users = await User.find();
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

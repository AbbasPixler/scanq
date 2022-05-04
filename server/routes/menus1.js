const router = require("express").Router();
const Menu1 = require("../models/Menu1");

//Create Menu
router.post("/", async (req, res) => {
  const newMenu1 = new Menu1(req.body);
  try {
    const savedMenu1 = await newMenu1.save();
    res.status(200).json(savedMenu1);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Menu

router.put("/:id", async (req, res) => {
  try {
    const menu1 = await Menu1.findById(req.params.id);
    if (menu1.username === req.body.username) {
      try {
        const updatedMenu1 = await Menu1.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMenu1);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your menu !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});

//Delete post by id
router.delete("/:id", async (req, res) => {
  try {
    const menu1 = await Menu1.findById(req.params.id);
    if (menu1.username === req.body.username) {
      try {
        await menu1.delete();
        res.status(200).json("Menu has been delete");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your menu !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});

//GET menu
router.get("/:id", async (req, res) => {
  try {
    const menu1 = await Menu1.findById(req.params.id);
    res.status(200).json(menu1);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
      let menus1;
    if(username) {
      menus1 = await Menu1.find({username})
    } else if (catName) {
      posts = await Post.find({categories: {
        $in:[catName]
      }})
    } else {
      menus1 = await Menu1.find();
    }
    res.status(200).json(menus1);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

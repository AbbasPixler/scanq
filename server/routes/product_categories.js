const router = require("express").Router();
const Product_Category = require("../models/Product_Categories");


//Create Category
router.post("/", async (req, res) => {
  const newCat = new Product_Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Category
router.get("/", async (req, res) => {
    try {
      const cats = await Product_Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //GET Category by id
router.get("/:id", async (req, res) => {
  try {
    const cat = await Product_Category.findById(req.params.id);
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

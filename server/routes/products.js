const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");

//Create Product
router.post("/", async(req, res) => {
  try {
    console.log(req.body)
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Product

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.username === req.body.username) {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your product !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});

//Delete Product by id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // if (product.username === req.body.username) {
      try {
        await product.delete();
        res.status(200).json("Product has been delete");
      } catch (err) {
        res.status(500).json(err);
      }
    // } else {
    //   res.status(401).json("You can delete only your product !");
    // }
  } catch (err) {

    res.status(500).json(err);
  }
});

//GET Product
router.get("/:id", async (req, res) => {
  try {
    const username = req.params.id
    const product = await Product.find({username : username})
   
    if(product.length > 0){
      res.status(200).json(product)
    }else{
      const error = "false"
      res.json(error)
    }
   
  } catch (err) {
    res.status(500).json(err)
  }
});

//GET Product
router.get("/recommended/:id", async (req, res) => {
  try {
    const username = req.params.id
    let product = await Product.find({username : username, recommended:true}).limit(4)
   
    if(product.length > 0){
      if(product.length < 4){
        const length = 4-product.length
        console.log(length)
        const totalProducts = await Product.find({username: username, recommended: false}).limit(length)
        let newProductObject = product.concat(totalProducts)
        console.log(newProductObject)
        product = newProductObject

      }
       res.status(200).json(product)
    }else{
      const error = "No Products from this user"
      res.status(500).json(error)
    }
   
  } catch (err) {
    res.status(500).json(err)
  }
});


//GET Product through id
router.get("/getProductById/:id", async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)

    res.status(200).json(product)
   
  } catch (err) {
    res.status(500).json(err)
  }
});

//GET Product by user
router.get("/:userId", async (req, res) => {
  try {
   const getProduct = await User.findById(req.body.userId)
   const userProducts = await Product.find ({ userId: getProduct._id})
   res.status(200).json(); 
  } catch (err) {
    res.status(500).json(err);
  }
})

//product filter by Category
router.get("/category/:id/:username", async (req, res)=>{
  if(req.params.id){
    const filteredProducts = await Product.find({category: req.params.id, username:req.params.username});
    if(filteredProducts.length > 0){
      res.status(200).json(filteredProducts)
    }else{
      return res.send({status: 400, message: "No products in this category"})
    }
  }
})

//GET ALL Product
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
      let products;
    if(username) {
      products = await Product.find({username})
    } else if (catName) {
      products = await Product.find({categories: {
        $in:[catName]
      }})
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Get All Product by username
// router.get("/productByUser", async (req, res) => {
//   try {
//    const getAllProducts = await Product.find({username: req.body.username})
//   //  const userProducts = await Product.find ({ userId: getProduct._id})
//    res.status(200).json(); 
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })
module.exports = router;
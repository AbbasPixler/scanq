const router = require("express").Router();
const Shop = require("../models/Shop");
const Post = require("../models/Post");

//Create Shop
router.post("/", async (req, res) => {
  if(req.body.twitter !== ""){
    if(req.body.twitter.slice(0, 8) !== "https://"){
      const TwitterString  = "https://"+req.body.twitter
      req.body.twitter = TwitterString
    }
  }
  if(req.body.facebook !== ""){
    if(req.body.facebook.slice(0, 8) !== "https://"){
      const facebookString  = "https://"+req.body.facebook
      req.body.facebook = facebookString
    }
  }
  if(req.body.instagram !== ""){
    if(req.body.instagram.slice(0, 8) !== "https://"){
      const instagramString  = "https://"+req.body.instagram
      req.body.instagram = instagramString
    }
  }
  if(req.body.youtube !== ""){
    if(req.body.youtube.slice(0, 8) !== "https://"){
      const youtubeString  = "https://"+req.body.youtube
      req.body.youtube = youtubeString
    }
  }
  if(req.body.grab !== ""){
    if(req.body.grab.slice(0, 8) !== "https://"){
      const grabString  = "https://"+req.body.grab
      req.body.grab = grabString
    }
  }
  if(req.body.lineman !== ""){
    if(req.body.lineman.slice(0, 8) !== "https://"){
      const linemanString  = "https://"+req.body.lineman
      req.body.lineman = linemanString
    }
  }
  if(req.body.robinhood !== ""){
    if(req.body.robinhood.slice(0, 8) !== "https://"){
      const robinhoodString  = "https://"+req.body.robinhood
      req.body.robinhood = robinhoodString
    }
  }
  //==================adding categories========================= 
  const newShop = new Shop(req.body);
  try {

    const savedShop = await newShop.save();
    res.status(200).json(savedShop);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Shop
/*  
1. find shop
2. compare shopuser/username 
 */

router.put("/:id", async (req, res) => {
  try {
    const shop = await Shop.find({username: req.params.id});
    if (shop[0].username === req.body.username) {

      if(!req.body.coverPhoto){
        delete req.body.coverPhoto
      }
      try {
        if(req.body.twitter !== ""){
          if(req.body.twitter.slice(0, 8) !== "https://"){
            const TwitterString  = "https://"+req.body.twitter
            req.body.twitter = TwitterString
          }
        }
        if(req.body.facebook !== ""){
          if(req.body.facebook.slice(0, 8) !== "https://"){
            const facebookString  = "https://"+req.body.facebook
            req.body.facebook = facebookString
          }
        }
        if(req.body.instagram !== ""){
          if(req.body.instagram.slice(0, 8) !== "https://"){
            const instagramString  = "https://"+req.body.instagram
            req.body.instagram = instagramString
          }
        }
        if(req.body.youtube !== ""){
          if(req.body.youtube.slice(0, 8) !== "https://"){
            const youtubeString  = "https://"+req.body.youtube
            req.body.youtube = youtubeString
          }
        }
        if(req.body.grab !== ""){
          if(req.body.grab.slice(0, 8) !== "https://"){
            const grabString  = "https://"+req.body.grab
            req.body.grab = grabString
          }
        }
        if(req.body.lineman !== ""){
          if(req.body.lineman.slice(0, 8) !== "https://"){
            const linemanString  = "https://"+req.body.lineman
            req.body.lineman = linemanString
          }
        }
        if(req.body.robinhood !== ""){
          if(req.body.robinhood.slice(0, 8) !== "https://"){
            const robinhoodString  = "https://"+req.body.robinhood
            req.body.robinhood = robinhoodString
          }
        }

        const updatedShop = await Shop.findOneAndUpdate(
          {username: req.params.id},
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedShop);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your shop !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});
// router.put("/:id", async (req, res) => {
//   try {
//     const shop = await Shop.findById(req.params.id);
//     if (shop.username === req.body.username) {
//       try {
//         const updatedShop = await Shop.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedShop);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can update only your shop !");
//     }
//   } catch (err) {

//     res.status(500).json(err);
//   }
// });

//Delete Shop by id
router.delete("/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (shop.username === req.body.username) {
      try {
        await shop.delete();
        res.status(200).json("Shop has been delete");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Shop !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});

//GET Shop
router.get("/:id", async (req, res) => {
  try {
    const shop = await Shop.find({username:req.params.id})
    res.status(200).json(shop);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Shops
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let shops;
    if(username) {
      shops = await Post.find({username})
    } else if (catName) {
      shops = await Shop.find({categories: {
        $in:[catName]
      }})
    } else {
      shops = await Shop.find();
    }
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET ALL Shops for home pages
router.get("/getshops/limitations", async(req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
      let shops;
    if(username) {
      shops = await Post.find({username}).limit(12)
    } else if (catName) {
      shops = await Shop.find({categories: {
        $in:[catName]
      }}).limit(12)
    } else {
      shops = await Shop.find().limit(12).sort({createdAt:-1});
    }
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get shop details through post id
router.get("/getShopDetail/:id", async (req, res) => {
  try {
    const postDetail = await Post.findById(req.params.id);
    const username = postDetail.username
    const shopDetail = await Shop.find({username:username})
     
    const data = shopDetail
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


// get shops based on the category-----

router.get("/getShopCategory/:id", async(req, res)=>{
  if(!req.params.id){
    res.status(500).json(err);
  }
  const categoryName = req.params.id
  try{
    const shops = await Shop.find({categories: categoryName})
    if(shops.length > 0){
      res.send(shops)
    }else{
      res.send(false)
    }
 
  }catch(err){
    res.status(500).json(err);
  }
})



module.exports = router;

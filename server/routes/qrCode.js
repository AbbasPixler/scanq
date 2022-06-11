const router = require("express").Router();
// const Post = require("../models/Post");
const Shop = require("../models/Shop");


router.put("/:id", async (req, res) => {
  try {
    const shop = await Shop.find({username: req.params.id});
    
    if (shop) {
      const id = shop.id

      try {
        const updatedShopQR = await Shop.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedShopQR); 
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Please create a shop !");
    }
  } catch (err) {

    res.status(500).json(err);
  }
});


//GET post
router.get("/:id", async (req, res) => {
  try {
    const qrDetails = await Shop.findById({username: req.params.id});
    // const username = postDetail.username
    // const shopDetail = await Shop.find({username:username})
     
    // const data = ({          
    //   postDetail: postDetail,
    //   shopDetail: shopDetail,          
    // })
    res.status(200).json(qrDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

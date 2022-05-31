const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport")
require("./../passport")

// const CLIENT_URL =  "http://localhost:3000/"
const CLIENT_URL =  "https://www.eatout.solutions/"




// router.get("/google", passport.authenticate("google", {scope:['profile', 'email']}))


// ===========================Google Login===========================
// ===========================Google Login===========================
// ===========================Google Login===========================

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/googleLogin/failed"
}))


router.get("/googleLogin/success", async (req, res)=>{

  if(req.user){
    const user = await User.findOne({provider_id: req.user.id, provider: req.user.provider})
    if(user){
       res.status(200).json({
        success: true,
        message: "success",
        user: user
      })
    }else{

      const checkUserEmail = await User.findOne({email: req.user.email})
      
      if(checkUserEmail){
        res.status(401).json({
          success: false,
          message: "User already Exist with this email id",
        })
      }else{
        const user = await User.create({
          username: req.user.name.givenName+ "_" +req.user.name.familyName,
          email: req.user.emails[0].value,
          provider: req.user.provider,
          provider_id: req.user.id
        });

         res.status(200).json({
          success: true,
          message: "success",
          user: user
        })
      }
    }


  }
  
})

router.get("/googleLogin/failure", (req, res)=>{
  if(req.user){
    res.status(401).json({
      success: false,
      message: "failure",
    })
  }
})


// ===========================Facebook Login===========================
// ===========================Facebook Login===========================
// ===========================Facebook Login===========================


router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/facebookLogin/failed"
}))

router.get("/facebookLogin/success", async (req, res)=>{
  if(req.user){
        res.status(200).json({
          success: true,
          message: "success",
          user: req.user
        })

    const user = await User.findOne({provider_id: req.user.id, provider: req.user.provider})
    if(user){
     return  res.status(200).json({
        success: true,
        message: "success",
        user: user
      })
    }else{

      const checkUserEmail = await User.findOne({email: req.user.email})
      
      if(checkUserEmail){
        res.status(401).json({
          success: false,
          message: "User already Exist with this email id",
        })
        
      }else{
        const user = await User.create({
          username: req.user.name.givenName+ "_" +req.user.name.familyName,
          email: req.user.emails[0].value,
          provider: req.user.provider,
          provider_id: req.user.id
        });

        return  res.status(200).json({
          success: true,
          message: "success",
          user: user
        })
      }
    }


  }
  
})

router.get("/facebookLogin/failure", (req, res)=>{
  if(req.user){
    res.status(401).json({
      success: false,
      message: "failure",
    })
  }
})


// =========================== Regular Registeration and Login ===========================
// =========================== Regular Registeration and Login ===========================
// =========================== Regular Registeration and Login ===========================


//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const usernameExist = await User.find({username: req.body.username})
    const emailExist =  await User.find({email: req.body.email})

    if(usernameExist.length > 0){
      return res.send({status: 400, message: "A user already exist with this username" });
    }

    if(emailExist.length > 0){
      return res.send({status: 400, message: "A user with this email is already exist" });
    }

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
     if(!user) {
      return res.send({status: 400, message: "Wrong username/password !"})
     }  

    const pwcheck = await bcrypt.compare(req.body.password, user.password);
     if (!pwcheck)  {
      return res.send({status: 400, message: "Wrong username/password !"})
     }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

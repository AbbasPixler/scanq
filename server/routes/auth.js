const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const usernameExist = await User.find({username: req.body.username})
    const emailExist =  await User.find({email: req.body.email})

    if(usernameExist.length > 0){
      return res.send({status: 400, message: "A user already exist with this username"})
    }

    if(emailExist.length > 0){
      return res.send({status: 400, message: "A user with this email is already exist"});
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

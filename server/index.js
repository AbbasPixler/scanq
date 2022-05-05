const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const shopRoute = require("./routes/shops");
const productRoute = require("./routes/products");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const cors = require('cors');
const path = require("path");

const uploadImage = require('./helpers/helpers')


const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

app.use(cors())
dotenv.config();
app.use(express.json());
app.use(multerMid.single('file'))
app.use("/", express.static(path.join(__dirname, "/public")))

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDB connection successful"))
  .catch((err) => console.log(err));


  
app.post('/upload', async(req, res, next) => {
  try {
    const myFile = req.file
    myFile.nameWithStamp = req.body.name
    const imageUrl = await uploadImage(myFile)
    console.log(imageUrl)
    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    next(error)
  }
})


app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/shops", shopRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);

// app.use(express.static(path.join(__dirname, "index.html")));
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static( 'client/build' ));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//     });
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });


app.listen(process.env.PORT || 4545 , () => {
  console.log("Application is online, Server is running on Port 4545");
});

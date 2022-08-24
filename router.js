// // This file is to run exact functions, list out the URLs our app may listen to, but only routes, not exact function

// // console.log("I am executed immediately")
// // console.log("More code inside router file")

// const express = require("express");
// // Creating express server which should just listen to routes, not creating a new express server, it's already created in app.js, it's like a mini express application
// const router = express.Router();
// // Defining userController
// const userController = require("./controllers/userController");

// // Whenever there is a get request on the home page, run this function - I don't need to define the function here, just write the function name - controllers folder: userController.js
// // router.get('/', function(req, res) {
// //     res.send("Welcome to the website!")
// // })
// // Calling this method saved in userController file instead of above - just calling the method here, not writing the code
// // router.get('/', userController.homepage)
// router.get("/", userController.home);

// //whenever there's a post request on register url, run this function: userController.register
// router.post("/register", userController.register);
// // whenever there's a post request on login, run this function: userController.login
// router.post("/login", userController.login);

// router.post("/logout", userController.logout);

// // How to connect app.js with router.js - this string will be saved inside the router const (variable)
// // module.exports = "I am the export for the router file"

// // Instead of string I can even write an object - and all of this will be stored inside the const router
// // module.exports = {
// //     name: "Timi",
// //     age: 4,
// //     species: "cat"
// // }

// // Exporting router
// module.exports = router;


const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require("./controllers/postController")

router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.get("/create-post", userController.mustBeLoggedIn, postController.viewCreateScreen);
// router.post("/create-post", postController)

router.post("/create-post", postController.create);

router.get("/profile/:username", userController.ifUserExists, userController.profilePostsScreen);

router.get("/post/:id", postController.viewSingle);
router.get("/post/:id/edit-post", postController.viewEditPost);
router.post("/post/:id/edit-post", postController.editPost);
router.post("/post/:id/delete-post", postController.deletePost);

router.post("/search", postController.search);

module.exports = router
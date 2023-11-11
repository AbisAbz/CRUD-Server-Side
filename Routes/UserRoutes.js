const express = require('express');
const userRoute = express();
const userController = require('../Controller/UserController');
const uploadOptions = require('../Multer'); // Import the multer instance

userRoute.post('/signup', userController.userRegistration);
userRoute.post('/login', userController.UserLogin);
userRoute.post("/uploadimg", uploadOptions.single('image'),userController.updateImage);


module.exports = userRoute;

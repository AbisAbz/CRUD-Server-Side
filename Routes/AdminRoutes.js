const express = require('express');
const AdminRoute = express.Router();
const adminController = require('../Controller/AdminController');


AdminRoute.post('/login', adminController.AdminLogin);
AdminRoute.get('/getuserlist', adminController.UserList);
AdminRoute.post('/addUser',adminController.addUser)
AdminRoute.post('/deleteUser/:id',adminController.deleteUser)
AdminRoute.get('/editUser/:id',adminController.editUserDetails);
AdminRoute.post('/updateuser',adminController.updateUserDetails);


module.exports = AdminRoute;

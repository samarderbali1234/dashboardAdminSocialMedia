const express = require('express');
const router = express.Router();



const usercontroller=require ('../../controllers/users');


router.post('/user-add', usercontroller.createUser);//route for create user
router.get('/user-data',usercontroller.readUser);//route for list user
router.post('/user-delete',usercontroller.deleteUser);//route for delete user
router.post('/login',usercontroller.loginUser);//route for delete user
router.put('/user-update/:id',usercontroller.updateUser);//route for update user
router.get('/user/photo/:id',usercontroller.photo);


module.exports = router;

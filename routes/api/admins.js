const express = require('express');
const router = express.Router();
const admincontroller=require ('../../controllers/admins');



router.post('/createadmin', admincontroller.createadmin);//route for create admin
router.post('/signin',admincontroller.signin);//route for login admin
router.get('/readAdmin',admincontroller.readAdmin);//route for list admin
router.put('/updateAdmin/:id',admincontroller.updateAdmin);//route for update admin
router.get('/getAdmin/:id',admincontroller.getbyid);//route for delete admin
router.post("/change_password/:email",admincontroller.ChangePassword)//route for change password
  module.exports = router;
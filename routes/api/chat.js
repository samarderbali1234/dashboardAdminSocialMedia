const express = require('express')
const router = express.Router();

const chatcontroller=require ('../../controllers/chat');
//router.post('/add-chat',chatcontroller. addchat);
router.get('/get-chat/:id', chatcontroller.getchat);
router.get('/get-chats', chatcontroller.getChats);
router.get('/get/:id', chatcontroller.readchat);

router.post('/add-chat/:id',chatcontroller. addchat);



module.exports = router;
const express = require('express');
const router = express.Router();
const notificationcontroller=require ('../../controllers/notifications');
router.post('/create-notif',notificationcontroller.addnotif);//pour créer un évenement
router.get('/notif-data',notificationcontroller.getnotif);//route for login even
router.post('/vunotif',notificationcontroller.Vunotif);
module.exports = router;
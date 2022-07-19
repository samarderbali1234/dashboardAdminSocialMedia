const express = require('express');
const router = express.Router();
const eventcontroller=require ('../../controllers/events');
router.post('/create-event',eventcontroller.createEvent);//pour créer un évenement
router.get('/event-data',eventcontroller.readEvent);//route for login even
router.post('/event-delete',eventcontroller.deleteEvent);//route for delete event
//post's photo
router.get("/event/photo/:id",eventcontroller.photo);
router.put("/approve/:id",eventcontroller.Approve);
module.exports = router;
const express = require('express');
const router = express.Router();
const storycontroller=require ('../../controllers/story');
router.post('/create-story',storycontroller.createStory);//pour créer un story
router.get('/story-data',storycontroller.readStory);//pour avoir la liste story
//story's photo
router.get("/story/photo/:id",storycontroller.photo);

router.post("/deletestory/",storycontroller.deleteStory);
module.exports = router;
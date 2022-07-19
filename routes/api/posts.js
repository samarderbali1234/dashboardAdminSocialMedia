

const express = require('express');
const router = express.Router();
const postcontroller=require ('../../controllers/posts');

//post's photo
router.get("/post/photo/:id", postcontroller.photo);
router.post('/post-delete/',postcontroller.deletePost);
router.post("/post-add", postcontroller.createPost);
router.get('/post-data',postcontroller.readPost);//route for login event
router.get("/count-post", postcontroller.countPost);//count numbre post
module.exports = router;
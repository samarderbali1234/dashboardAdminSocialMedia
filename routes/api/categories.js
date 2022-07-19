const express = require('express');
const router = express.Router();
const categorycontroller=require ('../../controllers/categories');
router.post('/create-categorie',categorycontroller.createCategory);//pour créer un story
router.get('/categorie-data',categorycontroller.readCategory);//pour avoir la liste story
//story's photo
router.get("/categorie/photo/:id",categorycontroller.photo);

router.post('/categorie-delete/',categorycontroller.deleteCategory);
module.exports = router;
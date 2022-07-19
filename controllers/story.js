const story = require('../models/story');

const Notification = require('../models/notification');
const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const ObjectID = require("mongoose").Types.ObjectId;
const _ = require('lodash');


         


  
//pour lister story
    
    module.exports.readStory = async (req, res) =>{
    story.find((err, docs) => {
        if (!err) res.send(docs);//retoune toutes les poste s'il n'a pas d'erreur
        else console.log("Error to get data : " + err);//s'il y'a d'erreur retourner erreur
      }).sort({ createdAt: -1 });//pour ranger de plus récent a mons récent
    };            

//créer story
exports.createStory = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  console.log(form);
  form.parse(req, (err, fields, files) => {
      if(err){
          return res.status(400).json({
              error: "Image could not be uploaded"
          });
      }
      let stories = new story(fields);
      console.log(fields);
      console.log(files);
      if(files.photo){
          stories.photo.data = fs.readFileSync(files.photo.path);
          stories.photo.contentType = files.photo.type;
      }
//pour ajouter une notification d'un nouveau événement 
const newNotifications = new Notification ({
    notif: req.body.notif,
    notif: "A new story is added",
});
      stories.save((err, result) => {
          if(err){
              return res.status(400).json({
                  error: err
              });
          }
          res.json(result);
      });
      newNotifications
    .save()
  });
};


module.exports.deleteStory = async (req, res) => {
    story.deleteOne({ _id: req.body._id}).then(post => {
        if (story) {
            return res.status(200).json({message: ' story deleted successfully. Refreshing data...', success: true})
        }
    });
};
//pour avoir la photo qui est stocké sous la forme binary
module.exports.photo = async (req, res) => {
  const {id} = req.params
  const stories = await story.findById({_id: id})
  if (! stories) return res.sendStatus(404);
  res.set("Content-Type", stories.photo.contentType);
  return res.status(200).send(stories.photo.data);
};
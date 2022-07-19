const express = require('express');
const router = express.Router();

const Notification = require('../models/notification');
const post = require('../models/posts')

//notification pour une nouvelle post
module.exports.addnotif = async (req, res) =>{
  
if (!(post.created === new Date())){
  
        const newNotifications = new Notification ({
            notif: req.body.notif,
            Vu: req.body.Vu,
            message: req.body.message,
        message: "your event is declined",
       
        });
        
        newNotifications
        .save()
      
        .then(notification => {
          
            return res.status(200).json({message: 'notification added successfully. Refreshing data...'})
           
        }).catch(err => console.log(err));
    }
    };


//pour afficher tous les notifications
module.exports.getnotif = async (req, res) =>{
    Notification.find({}).select(['-id']).then(notification => {
        if (notification) {
            return res.status(200).send(notification);
        }
    });
};

//conter table posts
module.exports.countNotif = async (req, res) =>{
  
  const Notifications = await Notification.find()
    Notification.countDocuments(function (err,count) {
       if (err){
          console.log(err)
        }else{
          console.log("Count :", count)
         Notification.compteur = count
         
         console.log(Notification.compteur )
        }
    });
 
  };
  module.exports.countNotif = async (req, res) =>{
  
    const Notifications = await Notification.find()
      Notification.countDocuments(function (err,count) {
         if (err){
            console.log(err)
          }else{
            console.log("Count :", count)
            var x= count
            if(count===1){
              const i =count
              console.log("i :", i)
            }
           
          
          }
      });
   
    };
 //update vu notif to true
  module.exports.Vunotif = async (req, res) => {

    var newvalues = {$set: {Vu: "true"} };
    Notification.updateMany( newvalues, function(err, res) {
      
      console.log( " document(s) updated");
     
    });

  }
   
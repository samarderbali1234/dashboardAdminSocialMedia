const events = require('../models/Events');
const Notification = require('../models/notification');
const formidable = require('formidable');
const fs = require('fs');
const ObjectID = require("mongoose").Types.ObjectId;
const _ = require('lodash');


        //pour supprimer event 

    
    module.exports.deleteEvent = async (req, res) =>{
    events.deleteOne({ _id: req.body._id}).then(even => {
        if (even) {
            return res.status(200).json({message: 'event deleted successfully. Refreshing data...', success: true})
        }
    });
};    


  
//pour lister les évenement
    
    module.exports.readEvent = async (req, res) =>{
    events.find((err, docs) => {
        if (!err) res.send(docs);//retoune toutes les poste s'il n'a pas d'erreur
        else console.log("Error to get data : " + err);//s'il y'a d'erreur retourner erreur
      }).sort({ createdAt: -1 });//pour ranger de plus récent a mons récent
    };            




    
//créer event
exports.createEvent = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  console.log(form);
  form.parse(req, (err, fields, files) => {
      if(err){
          return res.status(400).json({
              error: "Image could not be uploaded"
          });
      }
      let event = new events(fields);
      console.log(fields);
      console.log(files);
      if(files.photo){
          event.photo.data = fs.readFileSync(files.photo.path);
          event.photo.contentType = files.photo.type;
      }
//pour ajouter une notification d'un nouveau événement 
const newNotifications = new Notification ({
    notif: req.body.notif,
    notif: "A new event is added",
});
      event.save((err, result) => {
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


//pour avoir la photo qui est stocké sous la forme binary
module.exports.photo = async (req, res) => {
  const {id} = req.params
  const event = await events.findById({_id: id})
  if (! event) return res.sendStatus(404);
  res.set("Content-Type", event.photo.contentType);
  return res.status(200).send(event.photo.data);
};
//pour faire l'approve
module.exports.Approve = async (req, res) => {
  const {id} = req.params
  const event = await events.findById({_id: id})

    var newvalues = {$set: {Valide: "true"} };
    event.update( newvalues, function(err, res) {
      
      console.log( " document(s) updated");
     
    });
  }
 


const postModel = require("../models/posts");


const Notification = require('../models/notification');



    module.exports.createPost = async (req, res) =>{
  //ça pour créer un post  dans la base
    const newPost = new postModel({
      status: req.body.status,
   
     
    });
    //pour ajouter une notification d'un nouveau événement 
    const newNotifications = new Notification ({
      notif: req.body.notif,
      notif: "A new post is added",
  });
 
    try {
       const Post = newPost.save();//pour enregistrer la data dans le bd 
       return res.status(200).json({message: 'post added successfully. Refreshing data...'})
    } catch (err) {//s'il y a d'erreur
      return res.status(400).send(err);
    }
    newNotifications
    .save()
  };

//read posts
    module.exports.readPost = async (req, res) =>{
    postModel.find((err, docs) => {
      if (!err) res.send(docs);//retourne toutes les poste s'il n'a pas d'erreur
      else console.log("Error to get data : " + err);//s'il y'a d'erreur retourner erreur
    }).sort({ createdAt: -1 
    
  });//pour ranger de plus récent a mons récent


};
//pour avoir la photo qui est stocké sous la forme binary
module.exports.photo = async (req, res) => {
  const {id} = req.params
  const post = await postModel.findById({_id: id})
  if (! post) return res.sendStatus(404);
  res.set("Content-Type", post.photo.contentType);
  return res.status(200).send(post.photo.data);
};
        //pour supprimer post   
      module.exports.deletePost = async (req, res) =>{
        postModel.deleteOne({ _id: req.body._id}).then(user => {
              if (postModel) {
                  return res.status(200).json({message: 'post deleted successfully. Refreshing data...', success: true})
              }
          });
      };    
      
//count table posts
module.exports.countPost = async (req, res) =>{
  postModel.countDocuments(function (err, count) {
     if (err){
        console.log(err)
      }else{
        console.log("Count :", count)
       
      }
  });
};
      

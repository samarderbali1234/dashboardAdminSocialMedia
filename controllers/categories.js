const categorie = require('../models/categories');
const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const ObjectID = require("mongoose").Types.ObjectId;
const _ = require('lodash');


         


  
//pour lister story
    
    module.exports.readCategory = async (req, res) =>{
    categorie.find((err, docs) => {
        if (!err) res.send(docs);//retoune toutes les poste s'il n'a pas d'erreur
        else console.log("Error to get data : " + err);//s'il y'a d'erreur retourner erreur
      }).sort({ createdAt: -1 });//pour ranger de plus récent a mons récent
    };            

exports.createCategory = (req, res, next) => {


    //ça pour créer un post  dans la base
      const categories = new categorie({
        cName: req.body.cName,
      });
      try {
         const cat = categories.save();//pour enregistrer la data dans le bd 
         return res.status(200).json({message: 'categorie added successfully. Refreshing data...'})
      } catch (err) {//s'il y a d'erreur
        return res.status(400).send(err);
      }
    
    };
//pour avoir la photo qui est stocké sous la forme binary
module.exports.photo = async (req, res) => {
  const {id} = req.params
  const categories = await categorie.findById({_id: id})
  if (! categories) return res.sendStatus(404);
  res.set("Content-Type", categories.photo.contentType);
  return res.status(200).send(categories.photo.data);
};
  //pour supprimer post   
  module.exports.deleteCategory = async (req, res) =>{
    categorie.deleteOne({ _id: req.body._id}).then(user => {
          if (categorie) {
              return res.status(200).json({message: 'category deleted successfully. Refreshing data...', success: true})
          }
      });
  }; 
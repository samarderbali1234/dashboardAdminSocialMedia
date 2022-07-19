const chat  = require('../models/chat');
const express = require('express');
const router = express.Router();
//pour ajouter une discussion
module.exports.addchat = async (req, res) =>{
    console.log(req.file);
    const newchat= new chat({
        message: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver,
    });
    newchat
    .save()
    .then(chat => {
        return res.status(200).json({message: 'message added successfully. Refreshing data...'})
    }).catch(err => console.log(err));
 
};
/*module.exports.getchat= async (req, res) =>{
   
    chat.find({}).select(['-id']).then(chat => {
        if (chat) {
            return res.status(200).send(chat);
        }
    });
};*/

module.exports.getchat = ( res,  id) => {
   // chat.findById(id)
    chat.findById(id).populate('receiver.username')
      .populate('sender','_id username')
        .populate('reciever','_id username')
        .select('username ')
        .exec()
        .then(chat => {
            return res.status(200).json({message: 'message added successfully. Refreshing data...'})
        }).catch(err => console.log(err));
     
       
};
module.exports.readchat = async (req, res) =>{
    User.find({}).select(['-message '])
   .populate('sender',' username')
      //  .populate('reciever','_id username')
        .then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
};
/*
//pour avoir la photo qui est stocké sous la forme binary
module.exports.getchat = async (req, res) => {
    //const {id} = req.params
  //const {chats} = chat.findById({_id: id})
  //res.find( chats.sender.username);
  chat.find()
  .select('chats.receiver.username');
  return res.status(200)
};/*/


exports.getChats = (req,res) => {
    const sender = req.params.sender;
    const reciever = req.params.reciever;
    chat.find({ $or: [{ 'reciever.username': reciever, 'sender.username': sender },{ 'sender.username': reciever, 'reciever.username': sender }] }, (err, chats) => {
        if(err || !chats){
            return res.status(400).json({
                error: err
            });
        }
        res.json(chats);
    });
};
const Admin = require('../models/Admins');
const express = require('express');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const ObjectID = require("mongoose").Types.ObjectId;//pour vérifier l id
const bcrypt = require('bcryptjs');//pour crypter le mdp
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


//pour faire la création d'un admin

    module.exports.createadmin = async (req, res) =>{
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Admin.findOne({ email: req.body.email }).then(admin => {
        if (admin) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAdmin.password = hash;
                    newAdmin
                        .save()
                        .then(admin => {
                            return res.status(200).json({message: 'Admin added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                });
            });
        }
    });
};



//pour faire la login d'un admin
//router.post('/signin', (req, res) => {
    
    module.exports.signin = async (req, res) => { 
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({ email }).then(Admin => {
        if (!Admin) {
            return res.status(404).json({ email: 'Email not found' });
        }
        bcrypt.compare(password, Admin.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: Admin.id,
                 
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ password: 'Password incorrect' });
            }
        });
    });
};


//pour afficher la liste des admins
module.exports.readAdmin = (req, res) => {
    Admin.find((err, docs) => {
      if (!err) res.send(docs);//retoune toutes les poste s'il n'a pas d'erreur
      else console.log("Error to get data : " + err);//s'il y'a d'erreur retourner erreur
    }).sort({ createdAt: -1 });//pour ranger de plus récent a mons récent
  };


  //modifier admin dans le set existe les champs quand va modifier
module.exports.updateAdmin = (req, res) => {
    if (!ObjectID.isValid(req.params.id))// vérifier que l'id est trouvé dans la base
      return res.status(400).send("ID unknown : " + req.params.id);
  
    const updatedRecord = {
      email: req.body.email,
    };
  
    Admin.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },//modifier seulement l'email
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Update error : " + err);
      }
    );
  };


  
//supprimer admin par son id
module.exports.getbyid = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    Admin.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);//efface et retourne la data qui est supp
      else console.log("Delete error : " + err);
    });
  };
  
 
  
  //pour changer password
    /*module.exports.ChangePassword = (req, res) => {
        var {email} = req.params
    
  const admin =  Admin.findOne({email})
      
        const new_password = req.body.new_password;
        Admin.findOne({email})
            .select('password')
            .exec()
            .then(function (admin) {

                
                        if (true) {
                            bcrypt.hash(new_password, 10, function (err, hash) {
                                if (err) {
                                    return res.status(500).json({
                                        state:"failed",
                                        message: err.message
                                    });
                                }
                                else {
                                    Admin.findOneAndUpdate({email}, {$set: {password: hash}})
                                        .exec()
                                        .then(function (result) {
                                            const response = {
                                                state: "succes",
                                                message: "Password updated"
                                            };
                                            console.log("change password")
                                            res.status(200).json(response)


                                        }).catch(function (err) {
                                        console.log(err);
                                        res.status(500).json({
                                            state: "failed",
                                            message: err.message
                                        });
                                    });

                                }

                            });

                        }
                       
                else {
                    res.status(405).json({
                        state:"failed",
                        message: "admin not found"
                    });
                }
            }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                state:"failed",
                message: err.message
            });
        });
    };*/
    //pour changer password
module.exports.ChangePassword=async(req,res,next)=>{
  
    try{
        
        var {email}= req.params
       const salt = await bcrypt.genSalt(10);
          const new_password = await bcrypt.hash(req.body.new_password, salt);//ici on hash le new_password
     //const new_password=req.body.new_password
      password = await Admin.findOneAndUpdate({email},{password:new_password},{new:true});//on change le password qui existe dans la bd par le new_password
        console.log("change password")
      return res.status(200).json({status:true,data:new_password})
          //return res.status(200).json({message: 'Password changed successfully....'})
          
    }catch(error){
        return res.status(400).json({status:false ,error: "Error Occured"});
    }
}

const express = require('express');

const Notification = require('../models/notification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateUpdateUserInput = require('../validation/updateUser');
const User = require('../models/User');
//pour ajouter user
//router.post('/user-add', (req, res) => {
    
    module.exports.createUser = async (req, res) =>{
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ Email: req.body.Email }).then(user => {
        if (user) {
            return res.status(400).json({ Email: 'Email already exists' });
        } else {
            const newUser = new User({
                UserName: req.body.UserName,
                FullName: req.body.FullName,
                Email: req.body.email,
                Password: req.body.password,
                PhoneNumber: req.body.PhoneNumber
            });
            //pour ajouter une notification d'un nouveau événement 
    const newNotifications = new Notification ({
        notif: req.body.notif,
        notif: "A new user is added",
    });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.Password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.Password = hash;
                    newUser
                        .save()
                        .then(user => {
                            return res.status(200).json({message: 'User added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                });
                newNotifications
    .save()

            });
        }
    });
};
//pour lister users
//router.post('/user-data', (req, res) => {
    module.exports.readUser = async (req, res) =>{
    User.find({}).select(['-password']).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
};
//pour supprimer user
//router.post('/user-delete', (req, res) => {
    module.exports.deleteUser = async (req, res) =>{
    User.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
};
//pour avoir la photo qui est stocké sous la forme binary
module.exports.photo = async (req, res) => {
  const {id} = req.params
  const user = await User.findById({_id: id})
  if (! user) return res.sendStatus(404);
  res.set("Content-Type", user.photo.contentType);
  return res.status(200).send(user.photo.data);
};
//pour modifier user
//router.post('/user-update', (req, res) => {
    module.exports.updateUser = async (req, res) =>{
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    User.findOne({ _id }).then(user => {
        if (user) {
            if (req.body.password !== '') {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                    });
                });
            }
            let update = {'name': req.body.name, 'email': req.body.email, 'password': user.password};
            User.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update user.' });
                } else {
                    return res.status(200).json({ message: 'User updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now user found to update.' });
        }
    });
};
//login user
//router.post('/login', (req, res) => {
    module.exports.loginUser = async (req, res) =>{
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'Email not found' });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
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

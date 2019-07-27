const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    //console.log(id);
    User
        .findById(id)
        .then(user => {
            user
            ? res.status(200).json(user)
            : res.status(404).json(user);
        })
        .catch(err => {
            res.status(500).send('An internal server occurred could not find server')
        });
});

router.post('/', (req, res) => {
// Fetch a fakeUser from the database
const newUser = new User(req.body);
console.log(newUser);
    newUser
    .save()
    .then(user => {
    res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).send('An internal server occurred could not find server')
    });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.body._id)
        .then(users => {
            res.status(204).json(users);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(user => {
            user
            ? res.status(200).json(user)
            : res.status(404).json('The following user does not exist')
        })
        .catch(err => {
            res.status(500).send('An internal server error occurred');
        });
});

module.exports = router;
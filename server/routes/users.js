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
// New higher scope variable
let dbUser = null;
// Fetch the user from the database
User
    .find(req.body.author)
    .then(user => {
        // Store the fetched user in higher scope variable
        dbUser = user;

        // Create a user
        const newUser = new User(req.body);

        // Bind the user to it
        newUser.author = user._id;

        // Save it to the database
        res.status(201);
        return newUser.save();
    })
    .catch(err => {
        res.status(500).send('An internal server occurred could not find server')
    });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndDelete()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

module.exports = router;
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
    User
        .save()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

router.post('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(function(err) {
            console.log("error", err )
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
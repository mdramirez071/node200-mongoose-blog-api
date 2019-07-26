const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where({ featured : true })
        .then(blogs => {
            blogs 
            ? res.status(200).json(blogs) 
            : res.status(404).send('Failed to retrieve blog');
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    //console.log(id);
    Blog
        .findById(id)
        .then(blogs => {
            blogs
            ? res.status(200).json(blogs)
            : res.status(404).json(blogs);
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
    .findById(req.body.author)
    .then(user => {
        // Store the fetched user in higher scope variable
        dbUser = user;

        // Create a blog
        const newBlog = new Blog(req.body);

        // Bind the user to it
        newBlog.author = user._id;

        // Save it to the database
        return newBlog.save();
    })
    .then(blog => {
        // Push the saved blog to the array of blogs associated with the User
        dbUser.blogs.push(blog);

        // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
        dbUser.save()
        .then(() => res.status(201).json(blog));
    })
    .catch(err => {
        res.status(500).send('An internal server error occurred');
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    Blog
        .findByIdAndUpdate(id)
        .then(blogs => {
            res.status(204).json(blogs);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(function(err) {
            console.log("error", err )
        });
});

module.exports = router;
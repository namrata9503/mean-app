const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');
require('dotenv').config();


const db =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-jvvsr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if(err) {
        console.log('Connection error');
    }
});

router.get('/posts', function(req, res) {
    console.log('Requesting posts');
    post.find({})
        .exec(function(err, posts) {
            if (err) {
                console.log('Error getting the posts');
            } else {
                res.json(posts);
                console.log(posts);
            }
        });
});

router.get('/details/:id', function(req, res) {
    console.log('Requesting post single');
    post.findById(req.params.id)
        .exec(function(err, post) {
            if (err) {
                console.log('Error getting the post');
            } else {
                res.json(post);
                console.log(post);
            }
        });
});


router.post('/posts', function(req, res) {
    console.log('Posting a post');
    var newPost = new post();
    newPost.title = req.body.title;
    newPost.url = req.body.url;
    newPost.description = req.body.description;
    newPost.save(function(err, addedPost) {
        if (err) {
            console.log('Error inserting the post');
        } else {
            res.json(addedPost);
        }
    });
});

module.exports = router;


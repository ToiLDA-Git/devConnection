const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');

const validatePostInput = require('../../validation/post');

// @method: POST api/posts
// @desc: get current posts
// @access: private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  console.log(req.body);


  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id
  })

  newPost.save().then(post => res.json(post));
})

// @method: GET api/profile
// @desc: get current user profile
// @access: private

module.exports = router
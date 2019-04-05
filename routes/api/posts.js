const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

// @method: POST api/posts
// @desc: get current posts
// @access: private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id
  })

  newPost.save().then(post => res.json(post));
})

// @method: GET api/posts
// @desc: get list current post
// @access: public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err))
})

// @method: GET api/posts/:post_id
// @desc: get post by id
// @access: public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ noPost: 'no post found with that ID' }))
})

// @method: DELETE api/posts/:post_id
// @desc: get current post by id
// @access: private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notAuthorized: 'User not authorized' })
          }
          Post.deleteOne()
            .then(() => res.json({ success: true }))
            .catch(err => res.status(404).json({ postNoFound: 'Post not found' }))
        })
    })
})


// @method: POST api/posts/like/:id
// @desc: Like post
// @access: private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyLiked: 'User already liked this post' })
          }

          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postNoFound: 'Post not found' }))
    })
})

module.exports = router
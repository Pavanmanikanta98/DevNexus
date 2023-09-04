const express = require('express');
const router = express.Router();
const { check, validationResult } =require("express-validator");
const auth = require("../../middleware/auth");
const User = require('../../models/Users');
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

//@route post api/posts
//desc  create a post
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            Text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
        const post = await newPost.save();
        res.json(post)
        
    } catch (err) {
        console.log(err.message);
        res.status(400).send('server-error');
        
    }
});

//@route get api/posts
//desc  get all post
// access private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
        
    } catch (err) {
        console.log(err.message);
        return res.status(400).send('server problem');
    }
});
//@route get api/posts/:id
//desc  get post by id
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ msg: 'post is not found' });
        }
        res.json(post);
        
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).send({ msg: 'post is not found' });
        }
        return res.status(400).send('server problem');
    }
});

//@route delete api/posts/:id
//desc  delete post by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).send({ msg: 'post is not found' });
        }
        //checking user own that post
        if (req.user.id !== post.user.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.deleteOne();
        res.json({ msg: 'post removed' });
        
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).send({ msg: 'post is not found' });
        }
        return res.status(400).send('server problem');
        
    }
});
//@route put api/posts/:id
//desc  like a post by id
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // check if the user has already liked the post
        if (post.likes.filter(like => like.user.toString() === req.user.id).length>0){
            return res.status(400).json({ msg: 'post already liked' });
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        return res.status(400).send("server-side problem");
    }
});
//@route put api/posts/:id
//desc  unlike a post by id
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // checking for weather the post is already liked by user or  not
        if (!post.likes.filter(like => like.user.toString() === req.user.id).length>0){
            return res.status(400).json({ msg: 'post has not yet been liked' });
        }
        //get remove index
       // const rmIdex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        const rmIndex = post.likes.findIndex(like => like.user === req.user.id);
        post.likes.splice(rmIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        return res.status(400).send("server-side problem");
    }
});


//@route post api/posts/comments/:id
//desc  comment on  a post
router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newCom = {
            Text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        post.Comments.unshift(newCom);
        await post.save();
        res.json(post.Comments);
        
    } catch (err) {
        console.log(err.message);
        res.status(400).send('server-error');
        
    }
});
//@route delete api/posts/comments/:id/:comment_id
//desc  delete the comment on  a post
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id);
       // console.log(post); 
        //pull the comment ...
        const comment = post.Comments.find(comment => comment.id === req.params.comment_id);
       // console.log(comment); 
        // check for comment has really exists or not 
        if (!comment) {
            return res.status(404).json({ msg: 'comment does not exist' });
        }
        //check user
        //console.log(comment.user.toString()); 
        if (comment.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'user not authorized' });
        }
        const rmIndex = post.Comments.findIndex(comment => comment.user === req.user.id);
        post.Comments.splice(rmIndex, 1);
        await post.save();
        res.json(post.Comments);
    } catch (err) {
        console.log(err.message);
        res.status(400).send('server-error');
    }
    
});

module.exports = router;
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { valid } = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');


//get user model
const User = require('../../models/Users');
//@route api/users
//desc  register user 
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please entered valid email id').isEmail(),
    check('password', 'please enter password with 6 or more characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
        return res.status(500).json({ errors: [{ msg: 'User already exists' }] });
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d:'mm'
        })
        user = new User({
            name, email, avatar, password
        });
        //encrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //return res.json('user registered');
        //jwt
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 },
            (err,token) => {
                if (err) throw err;
                res.json({ token });
        });
        }
    catch (e) {
        console.log(e.message);
        //something went wrong on our side(server)
        return res.status(500).json('server-side error');

        
    }
    

    console.log(req.body);
} );
module.exports = router;
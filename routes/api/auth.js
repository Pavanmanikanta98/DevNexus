const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Users = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
//@route api/auth
//desc  test route
router.get('/', auth,async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json('server side error');
    }
    //res.send(' auth route')
});
//@route api/auth
//desc  authenticate user & get token 
router.post('/', [

    check('email', 'please entered valid email id').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
     //jwt
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 },
            (err,token) => {
                if (err) throw err;
            return  res.json({ token });
        });
        }
    catch (e) {
        console.log(e.message);
        //something went wrong on our side(server)
        return res.status(500).json('server-side error');

        
    }
    

   // console.log(req.body);
} );
module.exports = router;
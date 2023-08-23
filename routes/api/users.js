const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { valid } = require('joi');

//@route api/user
//desc  register user 
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please entered valid email id').isEmail(),
    check('password', 'please enter passwored with 6 or more characters').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.json('good');
   
} );
module.exports = router;
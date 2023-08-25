const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');

//@route api/auth
//desc  test route
router.get('/', auth,async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json('server side error');
    }
    res.send(' auth route')
});
module.exports = router;
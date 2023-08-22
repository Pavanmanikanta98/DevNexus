const express = require('express');
const router = express.Router();

//@route api/post
//desc  test route
router.get('/', (req, res) => res.send(' post route'));
module.exports = router;
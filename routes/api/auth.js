const express = require('express');
const router = express.Router();

//@route api/auth
//desc  test route
router.get('/', (req, res) => res.send(' auth route'));
module.exports = router;
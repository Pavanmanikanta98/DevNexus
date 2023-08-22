const express = require('express');
const router = express.Router();

//@route api/user
//desc  test route
router.get('/', (req, res) => res.send(' user route'));
module.exports = router;
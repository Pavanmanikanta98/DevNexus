const config = require('config');
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    console.log('1');
    const token = req.header('x-auth-token');
   // console.log(token);
    if (!token) {
        return res.status(500).json({ msg: 'No token,authorization denied' });
    }
    //verifing
    try {
        
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
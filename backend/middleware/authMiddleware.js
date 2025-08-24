const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    try 
    {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {return res.status(401).json({success: false,message: 'Access denied. No token provided.'});}
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Authenticated user:', decoded.email);
    next();
} 
catch (error) {
    console.error('Token verification error:', error);
        
    if (error.name === 'TokenExpiredError') {
    return res.status(401).json({success: false,message: 'Token has expired'});
    }
    res.status(401).json({
            success: false,
            message: 'Invalid token'});
    }
};
module.exports = verifyToken;

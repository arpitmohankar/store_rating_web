const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }
    next();
};
const isStoreOwner = (req, res, next) => {
    if (req.user.role !== 'store_owner') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Store owner privileges required.'
        });
    }
    next();
};

const isUserOrAdmin = (req, res, next) => {
    if (req.user.role !== 'user' && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied.'
        });
    }
    next();
};
module.exports = {isAdmin,isStoreOwner,isUserOrAdmin};

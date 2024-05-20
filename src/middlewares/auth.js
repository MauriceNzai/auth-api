const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const auth = async (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
                return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select('-password');
                next();
        } catch (err) {
                res.status(401).json({ message: 'Token is not valid' });
        }
};

const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.some(role => req.user.roles.includes(role))) {
			return res.status(403).json({ message: 'Access denied' });
		}
		next();
	};
};

module.exports = { auth, authorize};

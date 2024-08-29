const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is provided, return an unauthorized error
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token payload (e.g., user ID) to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return an unauthorized error
        res.status(401).json({ message: 'Invalid token' });
    }
};

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // إذا لم يكن هناك توكن

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403); // إذا كان التوكن غير صحيح
        
        req.user = user; // إضافة معلومات المستخدم إلى req
        next();
    });
};

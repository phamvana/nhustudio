const User = require('../models/userModel.js'); // Lấy thông tin từ model
const path = require('path');                   // đường dẫn
const asyncHandler = require('express-async-handler');
/**
 * 1. Đăng ký thành viên mới
 */
const registerUser = asyncHandler(async (req, res) => {
    const {
        email,
        name,
        password,
        address,
        phone
    } = req.body;
    const userExists = await User.findOne({
        email,
    });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        address,
        phone
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generate(user._id),
            isAdmin: user.isAdmin,
        });
    } else {
        res.stutus(403);
        throw new Error("Invalid user ID | user ID không đúng!");
    }
});

module.exports = registerUser;
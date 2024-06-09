const User = require('../models/userModel.js'); // Lấy thông tin từ model
const path = require('path');                   // đường dẫn
const asyncHandler = require('express-async-handler');
/**
 * 1. Đăng ký thành viên mới
 */
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {
        name,
        email,
        password,
        address,
        phone
    } = req.body;
    //kiểm tra hôạt động của req.body
    console.log('Kiểm tra');
    console.log(name, email,password,address,phone);

    const userExists = await User.findOne({
        email,
    });

    if (userExists) {
        res.status(400);
        // throw new Error("User already exists");
        console.log('Email đã được đăng ký');
    }
    
    const user = await User.create({
        name,
        email,
        password,
        address,
        phone
    });
    
    // Trả về kết quả đã đăng ký thành công,
    // if (user) {
    //     res.status(201).json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         // token: generate(user._id), tạm thời chưa sử dụng
    //         isAdmin: user.isAdmin,
    //          address: user.address,
    //         phone: user.phone
    //     });
    // } else {
    //     res.stutus(403);
    //     throw new Error("Invalid user ID | user ID không đúng!");
    // }
    res.redirect('/');
    console.log('Đăng ký thành viên thành công');
});

module.exports = registerUser;
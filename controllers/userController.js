const User = require("../models/userModel.js"); // Lấy thông tin từ model
const path = require("path"); // đường dẫn
const asyncHandler = require("express-async-handler");
/**
 * 1. Đăng ký thành viên mới
 */
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, address, phone } = req.body;
  //kiểm tra hôạt động của req.body
  console.log("Kiểm tra");
  console.log(name, email, password, address, phone);

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    res.status(400);
    // throw new Error("User already exists");
    console.log("Email đã được đăng ký");
  }

  const user = await User.create({
    name,
    email,
    password,
    address,
    phone,
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
  res.redirect("/");
  console.log("Đăng ký thành viên thành công");
});

/**
 * Đăng nhập thành viên
 */
const authUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { email, psw } = req.body;
  //kiểm tra hôạt động của req.body
  // console.log('Kiểm tra đăng nhập như sau:');
  // console.log('Email: ' + email + ' và mật khẩu: ' + psw);
  const user = await User.findOne({
    email,
  });
  /**
   * Kiểm tra điều kiện có email trong cơ sở dữ liệu không!
   * */
  if (user) {
    console.log("Tìm thấy email: " + email + " trong cơ sở dữ liệu!");
  } else {
    console.log("Không có email trong cơ sở dữ liệu!");
  }
  /**
   * Kiểm tra 2 điều kiện
   */
  if (user && (await user.matchPassword(psw))) {
    console.log(user.name + " đăng nhập thành công!");
    req.session.userId = user._id;
    req.session.username = user.name;
    req.session.email = user.email;
    req.session.userIsAdmin = user.isAdmin;
    req.session.userAdress = user.address;
    req.session.userPhone = user.phone;
    req.session.image = user.image;

    // console.log('Session username = ' + req.session.username);
  } else {
    console.log("Sai mật khẩu!");
  }
  res.redirect("/");
});

/**
 * Đăng xuất
 */
const logOut = asyncHandler(async (req, res) =>
  req.session.destroy(() => {
    res.redirect("/");
  })
);
/**
 * Thông tin user
 */
const userInfo = asyncHandler(async (req, res) => res.render("info"));
module.exports = {
  registerUser,
  authUser,
  logOut,
  userInfo,
};

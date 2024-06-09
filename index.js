const path = require('path');
const phamvana = require('express');
const dotenv = require('dotenv');
dotenv.config(); //Lấy giá trị env
const morgan = require('morgan');
const nhustudio = new phamvana();
const ejs = require('ejs');
const bodyParser = require('body-parser'); // lấy giá trị form nhập làm body
/**
 * Kết nối cơ sở dữ liệu MongoDB bằng Mongoose
*/
const connectDB = require('./config/db.js');
connectDB();
/**
 *cổng hoạt động của chương trình
 */
const PORT = process.env.PORT || 4000;
/**
 * Chạy server
*/
nhustudio.listen(PORT, ()=>{
    console.clear();
    console.log(`======================================`);
    console.log(`Tiểu luận tốt nghiệp đại học`);
    console.log(`Ngành: Công nghệ thông tin`);
    console.log(`Đề tài: Xây dựng ứng dụng Như Studio`);
    console.log(`GVHD: TS.Lâm Nhựt Khang`);
    console.log(`Thực hiện: Phạm Văn Á`);
    console.log(`MSSV: cm21v7x306`);
    console.log(`======================================`);
    console.log(`PORT = ${PORT}`);
    console.log(`======================================`);
});
/**
 * Tạo trang chủ với ejs
 * 30/5/2024
*/
nhustudio.use(phamvana.static('public')); // Chỉ định thư mục public làm thư mục tĩnh cho trang.
nhustudio.set('view engine','ejs'); // Khai báo engine cho ejs
nhustudio.use(bodyParser.json());
nhustudio.use(bodyParser.urlencoded({extended:true}));
nhustudio.get('/',(req,res)=>{
    res.render('index');
});   
/**
 * Các route thành viên 
 */
// nhustudio.post('/users/register',(req,res)=>{
//     console.log(req.body);
//     res.redirect('/');
// })
const registerUser = require('./controllers/userController.js');

nhustudio.use('/users/register', registerUser);            // Chuyển đến route đăng ký thành viên
/**
 * Tạo middleware xửa lý không tìm thấy trang
*/
const {notFound, errorHandler} = require('./middleware/errorMiddleware.js');
// Lỗi khi đọc dữ liệu từ các route
nhustudio.use(notFound);
/**
 * 28/5/2024
 * Pham Van A
 */ 
const path = require('path');
const phamvana = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const nhustudio = new phamvana();
const ejs = require('ejs');
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
nhustudio.get('/',(req,res)=>{
    res.render('index');
});
/**
 * 28/5/2024
 * Pham Van A
 */
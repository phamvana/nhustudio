const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        //thông báo 
        console.log(`Kết nối dữ liệu thành công ! `);
        console.log(`======================================`);
        console.log(`Morgan hoạt động ghi lại logger ...`);
        // console.log(
        //     `MongoDB is connected: ${conn.connection.host}`.white
        // );
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
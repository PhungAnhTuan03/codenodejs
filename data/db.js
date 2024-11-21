const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // Cấu hình cơ sở dữ liệu
    const dbConfig = {
        host: 'localhost', // Thay bằng địa chỉ máy chủ của bạn
        port: 3306,        // Thay bằng cổng của MySQL
        user: 'root',      // Thay bằng tên người dùng MySQL
        password: '123456', // Thay bằng mật khẩu MySQL
        database: 'qlitimviec' // Thay bằng tên cơ sở dữ liệu
    };

    // Tạo cơ sở dữ liệu nếu chưa tồn tại
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);

    // Kết nối với cơ sở dữ liệu
    const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        dialect: 'mysql',
    });

    // Khởi tạo models và thêm vào đối tượng db
    db.User = require('../users/user.model')(sequelize);

    // Đồng bộ hóa tất cả các models với cơ sở dữ liệu
    await sequelize.sync({ alter: true });
}

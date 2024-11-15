// const mysql = require('mysql2');
// const { Sequelize } = require('sequelize');

// const con = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "123456",
//     database: "qlitimviec"
// });

// // Function to format table output
// const formatTableOutput = (tableName, rows) => {
//     console.log(`\n=== Data in Table: ${tableName} ===`);
//     if (rows.length === 0) {
//         console.log("No data available in this table.");
//         return;
//     }

//     // Get column names
//     const columns = Object.keys(rows[0]);
//     const separator = '-'.repeat(50);

//     // Print column headers
//     console.log(separator);
//     console.log(columns.join(' | '));
//     console.log(separator);

//     // Print each row of data
//     rows.forEach(row => {
//         console.log(columns.map(col => row[col]).join(' | '));
//     });
//     console.log(separator);
// };

// con.connect((err) => {
//     if (err) throw err;
//     console.log("Connected to MySQL!");

//     // Query to get all tables in the database
//     con.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'qlitimviec'", (err, tables) => {
//         if (err) throw err;

//         // For each table, get its data
//         tables.forEach(table => {
//             const tableName = table.TABLE_NAME || table.table_name;

//             // Query to get all data from each table
//             con.query(`SELECT * FROM \`${tableName}\``, (err, rows) => {
//                 if (err) {
//                     console.log(`Error fetching data from table ${tableName}:`, err);
//                 } else {
//                     formatTableOutput(tableName, rows);
//                 }
//             });
//         });
//     });
// });

// module.exports = con;


// db.js - Sequelize initialization
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('qlitimviec', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected with Sequelize!'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;

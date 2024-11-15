const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const CartItem = sequelize.define('CartItem', {
    PostJobId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'PostJob', key: 'id' } },
    JobName: DataTypes.STRING,
    CompanyName: DataTypes.STRING,
    ProvinceName: DataTypes.STRING,
    SalaryMin: DataTypes.INTEGER,
    SalaryMax: DataTypes.INTEGER,
    EmployerType: DataTypes.STRING,
    ApplyDate: DataTypes.DATE,
    imageUrl: DataTypes.STRING
});

module.exports = CartItem;

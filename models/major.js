const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Major = sequelize.define('Major', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    major_name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'Major' });

module.exports = Major;

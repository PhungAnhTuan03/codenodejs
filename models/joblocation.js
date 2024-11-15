const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const JobLocation = sequelize.define('JobLocation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    province_name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'JobLocation' });

module.exports = JobLocation;

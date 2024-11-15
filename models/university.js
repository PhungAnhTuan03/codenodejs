const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const University = sequelize.define('University', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    university_name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'University' });

module.exports = University;

const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Experience = sequelize.define('Experience', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    experience_name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'Experience' });

module.exports = Experience;

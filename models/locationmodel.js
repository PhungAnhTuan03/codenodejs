const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Location = sequelize.define('Location', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    location_name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Location;

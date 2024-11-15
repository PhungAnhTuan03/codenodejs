const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Role = sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'Role' });

const UserRole = sequelize.define('UserRole', {
    userId: { type: DataTypes.STRING, references: { model: 'ApplicationUser', key: 'id' }, primaryKey: true },
    roleId: { type: DataTypes.INTEGER, references: { model: 'Role', key: 'id' }, primaryKey: true }
}, { tableName: 'UserRole' });

module.exports = { Role, UserRole };

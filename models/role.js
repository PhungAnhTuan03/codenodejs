const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Role', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        role_name: { type: DataTypes.STRING, unique: true, allowNull: false }
    }, { timestamps: false });
};

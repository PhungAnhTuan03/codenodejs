const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('UserRole', {
        userId: { type: DataTypes.STRING, primaryKey: true },
        roleId: { type: DataTypes.INTEGER, primaryKey: true }
    }, { timestamps: false });
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('JobLocation', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        province_name: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: false });
};

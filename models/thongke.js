const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('ThongKe', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        slUser: { type: DataTypes.INTEGER, defaultValue: 0 },
        slCompany: { type: DataTypes.INTEGER, defaultValue: 0 },
        slUV: { type: DataTypes.INTEGER, defaultValue: 0 },
        slBTD: { type: DataTypes.INTEGER, defaultValue: 0 },
        slUT: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, { timestamps: false });
};

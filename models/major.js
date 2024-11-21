const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Major', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        major_name: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: false });
};

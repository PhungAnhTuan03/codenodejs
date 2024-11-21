const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Experience', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        experience_name: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: false });
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Location', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        location_name: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: false });
};

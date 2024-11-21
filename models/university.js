const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('University', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        university_name: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: false });
};

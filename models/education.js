const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Education', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        gpa: { type: DataTypes.FLOAT },
        start_date: { type: DataTypes.DATE },
        end_date: { type: DataTypes.DATE },
        applicationUserId: { type: DataTypes.STRING },
        universityId: { type: DataTypes.INTEGER },
        majorId: { type: DataTypes.INTEGER }
    }, { timestamps: false });
};

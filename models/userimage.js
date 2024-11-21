const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('UserImage', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        applicationUser_image_url: { type: DataTypes.STRING },
        applicationUserId: { type: DataTypes.STRING }
    }, { timestamps: false });
};

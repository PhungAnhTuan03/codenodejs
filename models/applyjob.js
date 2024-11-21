const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('ApplyJob', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        url_cv: { type: DataTypes.STRING },
        cover_letter: { type: DataTypes.TEXT },
        feedback: { type: DataTypes.TEXT },
        email: { type: DataTypes.STRING },
        fullName: { type: DataTypes.STRING },
        imageCompany: { type: DataTypes.STRING },
        companyName: { type: DataTypes.STRING },
        emailCompany: { type: DataTypes.STRING },
        contact_noCompany: { type: DataTypes.STRING },
        create_at: { type: DataTypes.DATE },
        update_at: { type: DataTypes.DATE },
        post_JobId: { type: DataTypes.INTEGER },
        application_userId: { type: DataTypes.STRING }
    }, { timestamps: false });
};

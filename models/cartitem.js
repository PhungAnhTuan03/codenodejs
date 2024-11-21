const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('CartItem', {
        postJobId: { type: DataTypes.INTEGER, primaryKey: true },
        jobName: { type: DataTypes.STRING },
        companyName: { type: DataTypes.STRING },
        provinceName: { type: DataTypes.STRING },
        salaryMin: { type: DataTypes.INTEGER },
        salaryMax: { type: DataTypes.INTEGER },
        employerType: { type: DataTypes.STRING },
        applyDate: { type: DataTypes.DATE },
        imageUrl: { type: DataTypes.STRING }
    }, { timestamps: false });
};

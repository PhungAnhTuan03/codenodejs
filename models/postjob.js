const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('PostJob', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        job_name: { type: DataTypes.STRING, allowNull: false },
        job_description: { type: DataTypes.TEXT },
        required_skill: { type: DataTypes.TEXT },
        benefit: { type: DataTypes.TEXT },
        employmentType: { type: DataTypes.STRING },
        salary_min: { type: DataTypes.INTEGER },
        salary_max: { type: DataTypes.INTEGER },
        detail_location: { type: DataTypes.STRING },
        create_at: { type: DataTypes.DATE },
        update_at: { type: DataTypes.DATE },
        apply_date: { type: DataTypes.DATE },
        is_active: { type: DataTypes.TINYINT },
        job_LocationId: { type: DataTypes.INTEGER },
        experienceId: { type: DataTypes.INTEGER },
        applicationUserId: { type: DataTypes.STRING },
        majorId: { type: DataTypes.INTEGER }
    }, { timestamps: false });
};

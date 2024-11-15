const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const PostJob = sequelize.define('PostJob', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    job_name: DataTypes.STRING,
    job_description: DataTypes.TEXT,
    required_skill: DataTypes.TEXT,
    benefit: DataTypes.TEXT,
    employmentType: DataTypes.STRING,
    salary_min: DataTypes.INTEGER,
    salary_max: DataTypes.INTEGER,
    detail_location: DataTypes.STRING,
    create_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    apply_date: DataTypes.DATE,
    is_active: DataTypes.TINYINT,
    job_LocationId: { type: DataTypes.INTEGER, references: { model: 'JobLocation', key: 'id' } },
    experienceId: { type: DataTypes.INTEGER, references: { model: 'Experience', key: 'id' } },
    applicationUserId: { type: DataTypes.STRING, references: { model: 'ApplicationUser', key: 'id' } },
    majorId: { type: DataTypes.INTEGER, references: { model: 'Major', key: 'id' } }
}, { tableName: 'PostJob' });

module.exports = PostJob;

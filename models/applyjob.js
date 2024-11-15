const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const ApplyJob = sequelize.define('ApplyJob', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url_cv: DataTypes.STRING,
    cover_letter: DataTypes.TEXT,
    Feedback: DataTypes.TEXT,
    Email: DataTypes.STRING,
    FullName: DataTypes.STRING,
    imageCompany: DataTypes.STRING,
    companyName: DataTypes.STRING,
    emailCompany: DataTypes.STRING,
    contact_noCompany: DataTypes.STRING,
    create_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    post_JobId: { type: DataTypes.INTEGER, references: { model: 'PostJob', key: 'id' } },
    application_userId: { type: DataTypes.STRING, references: { model: 'ApplicationUser', key: 'id' } }
}, { tableName: 'ApplyJob' });

module.exports = ApplyJob;

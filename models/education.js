const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Education = sequelize.define('Education', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    gpa: DataTypes.FLOAT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    applicationUserId: { type: DataTypes.STRING, references: { model: 'ApplicationUser', key: 'id' } },
    universityId: { type: DataTypes.INTEGER, references: { model: 'University', key: 'id' } },
    MajorId: { type: DataTypes.INTEGER, references: { model: 'Major', key: 'id' } }
}, { tableName: 'Education' });

module.exports = Education;

const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const ApplicationUser = sequelize.define('ApplicationUser', {
    id: { type: DataTypes.STRING, primaryKey: true },
    UserName: DataTypes.STRING,
    NormalizedUserName: DataTypes.STRING,
    Email: DataTypes.STRING,
    NormalizedEmail: DataTypes.STRING,
    EmailConfirmed: DataTypes.BOOLEAN,
    PasswordHash: DataTypes.STRING,
    SecurityStamp: DataTypes.STRING,
    ConcurrencyStamp: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    PhoneNumberConfirmed: DataTypes.BOOLEAN,
    TwoFactorEnabled: DataTypes.BOOLEAN,
    LockoutEnd: DataTypes.DATE,
    LockoutEnabled: DataTypes.BOOLEAN,
    AccessFailedCount: DataTypes.INTEGER,
    mobile_no: DataTypes.STRING,
    city: DataTypes.STRING,
    fullname: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    image_url: DataTypes.STRING,
    hard_skills: DataTypes.TEXT,
    soft_skills: DataTypes.TEXT,
    introduce_yourself: DataTypes.TEXT,
    poisition_user: DataTypes.STRING,
    create_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    is_active: DataTypes.TINYINT,
    address: DataTypes.STRING,
    introduce_company: DataTypes.TEXT,
    company_name: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    position_title: DataTypes.STRING,
    category: DataTypes.STRING,
    website: DataTypes.STRING,
    location_id: { type: DataTypes.INTEGER, references: { model: 'Location', key: 'id' } }
}, { tableName: 'ApplicationUser' });

module.exports = ApplicationUser;

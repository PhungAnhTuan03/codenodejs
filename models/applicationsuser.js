const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('ApplicationUser', {
        id: { type: DataTypes.STRING, primaryKey: true },
        userName: { type: DataTypes.STRING },
        normalizedUserName: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        normalizedEmail: { type: DataTypes.STRING },
        emailConfirmed: { type: DataTypes.BOOLEAN },
        passwordHash: { type: DataTypes.STRING },
        securityStamp: { type: DataTypes.STRING },
        concurrencyStamp: { type: DataTypes.STRING },
        phoneNumber: { type: DataTypes.STRING },
        phoneNumberConfirmed: { type: DataTypes.BOOLEAN },
        twoFactorEnabled: { type: DataTypes.BOOLEAN },
        lockoutEnd: { type: DataTypes.DATE },
        lockoutEnabled: { type: DataTypes.BOOLEAN },
        accessFailedCount: { type: DataTypes.INTEGER },
        mobile_no: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        fullname: { type: DataTypes.STRING },
        date_of_birth: { type: DataTypes.DATE },
        image_url: { type: DataTypes.STRING },
        hard_skills: { type: DataTypes.TEXT },
        soft_skills: { type: DataTypes.TEXT },
        introduce_yourself: { type: DataTypes.TEXT },
        poisition_user: { type: DataTypes.STRING },
        create_at: { type: DataTypes.DATE },
        update_at: { type: DataTypes.DATE },
        is_active: { type: DataTypes.TINYINT },
        address: { type: DataTypes.STRING },
        introduce_company: { type: DataTypes.TEXT },
        company_name: { type: DataTypes.STRING },
        contact_no: { type: DataTypes.STRING },
        position_title: { type: DataTypes.STRING },
        category: { type: DataTypes.STRING },
        website: { type: DataTypes.STRING },
        location_id: { type: DataTypes.INTEGER }
    }, {
        defaultScope: { attributes: { exclude: ['passwordHash'] } },
        scopes: { withHash: { attributes: {} } }
    });
};

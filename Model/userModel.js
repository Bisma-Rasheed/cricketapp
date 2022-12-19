//User Table Model

module.exports = (sequelize, DataTypes) => {
    const userData = sequelize.define('userData', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'A User is already registered against this email address'
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
    return userData;
};
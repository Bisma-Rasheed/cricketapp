//player table model
module.exports = (sequelize, DataTypes) => {
    const player = sequelize.define('playerData', {
        playerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        playingRole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        partnerWith: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
    );

    return player;
};
module.exports = (sequelize, DataTypes) => {

    const Activities = sequelize.define("Activities", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamps: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    
    

    return Activities
}
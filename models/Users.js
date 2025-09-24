module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        fullName: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    
    return Users;
}
module.exports = (sequelize, DataTypes) => {

    const Students = sequelize.define("Students", {
        studentName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    

    return Students
}
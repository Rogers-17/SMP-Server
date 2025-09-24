module.exports = (sequelize, DataTypes) => {

    const Courses = sequelize.define("Courses", {
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        college: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    

    return Courses
}
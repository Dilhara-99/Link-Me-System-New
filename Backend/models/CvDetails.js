module.exports = (sequelize, DataTypes) => {
    const CvDetails = sequelize.define("CvDetails",{
        cvId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cvImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return CvDetails;
}
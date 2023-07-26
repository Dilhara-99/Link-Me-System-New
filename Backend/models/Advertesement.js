module.exports = (sequelize, DataTypes) => {
    const Advertesement = sequelize.define("Advertesement",{
        closingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Advertesement;
}
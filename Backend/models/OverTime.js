module.exports = (sequelize, DataTypes) => {
    const OverTime = sequelize.define("OverTime",{
        overtimeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
        OverTimeType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        OverTimeHours: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return OverTime;
}
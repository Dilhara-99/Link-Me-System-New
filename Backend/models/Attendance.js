module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      inTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      outTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    });
  
    Attendance.associate = (models) => {
      Attendance.belongsTo(models.Users, { foreignKey: 'UserId', as: 'user' });
    };
  
    return Attendance;
  };
  
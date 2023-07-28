module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
      attendanceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      epf: {
        type: DataTypes.INTEGER,
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
    return Attendance;
  };
  
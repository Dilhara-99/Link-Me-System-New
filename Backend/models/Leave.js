module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define("Leave", {
      leaveId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      leaveType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fromDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      toDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      numberOfDays: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      coveringPerson: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      epf: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Leave;
  };
  
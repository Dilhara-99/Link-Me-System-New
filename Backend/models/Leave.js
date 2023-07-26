module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define("Leave", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      leaveType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leaveBalance: {
        type: DataTypes.FLOAT,
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
    });
  
    Leave.associate = (models) => {
      Leave.belongsTo(models.Users, { foreignKey: 'UserId', as: 'user' });
    };
  
    return Leave;
  };
  
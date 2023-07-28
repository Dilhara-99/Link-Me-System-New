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
      Leave.belongsTo(models.Registrations, { foreignKey: 'epf', as: 'registrations', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    };
  
    return Leave;
  };
  
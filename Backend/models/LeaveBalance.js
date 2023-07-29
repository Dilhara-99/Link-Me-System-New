module.exports = (sequelize, DataTypes) => {
    const LeaveBalance = sequelize.define("LeaveBalance", {
      epf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      annualBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      casualBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });

    return LeaveBalance;
  };
module.exports = (sequelize, DataTypes) => {
    const UserRegistrationView = sequelize.define("userregistrationview", {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      tempid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      approveStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      epf: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName:"userregistrationview",
      timestamps:false,
    }
    );
  
    return UserRegistrationView;
  };
  
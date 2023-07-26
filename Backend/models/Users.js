module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tempid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Users.associate = (models) => {
    Users.hasOne(models.Registrations, { foreignKey: 'UserId', as: 'registration' });
    Users.hasMany(models.Attendance, { foreignKey: 'UserId', as: 'attendances' });
    Users.hasMany(models.Leave, { foreignKey: 'UserId', as: 'leaves' });
  };

  return Users;
};

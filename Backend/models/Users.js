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
    }
  });

  Users.associate = (models) => {
    Users.hasOne(models.Registrations, { foreignKey: 'UserId', as: 'registrations', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    
  };

  return Users;
};

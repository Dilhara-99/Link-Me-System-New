module.exports = (sequelize, DataTypes) => {
  const Registrations = sequelize.define("Registrations", {
    registrationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameWithInitials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fixNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankBranch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approveStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    epf: {
      type: DataTypes.STRING,
      allowNull: true,
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

  Registrations.associate = (models) => {
    Registrations.belongsTo(models.Users, { foreignKey: 'UserId', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Registrations.hasOne(models.Registrations, { foreignKey: 'UserId', as: 'registrations', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };

  return Registrations;
};

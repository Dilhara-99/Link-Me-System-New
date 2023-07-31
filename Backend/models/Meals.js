module.exports = (sequelize, DataTypes) => {
  const Meals = sequelize.define("Meals", {
    mealCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    mealType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Meals;
};

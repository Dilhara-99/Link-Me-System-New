module.exports = (sequelize, DataTypes) => {
  const OrderedMeals = sequelize.define("OrderedMeals", {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    epf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mealCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  return OrderedMeals;
};

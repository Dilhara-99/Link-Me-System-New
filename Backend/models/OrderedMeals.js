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
      allowNull: false,
    },
  });

  OrderedMeals.associate = (models) => {
    OrderedMeals.belongsTo(models.Registrations, {
      foreignKey: "epf",
      as: "registrations",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    OrderedMeals.belongsTo(models.Meals, {
      foreignKey: "mealCode",
      as: "meals",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return OrderedMeals;
};

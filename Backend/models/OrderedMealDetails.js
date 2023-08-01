module.exports = (sequelize, DataTypes) => {
    const OrderedMealDetails = sequelize.define("orderedmealdetails", {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      epf: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mealCode: {
        type: DataTypes.STRING,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName:"orderedmealdetails",
      timestamps:false,
    }
    );
  
    return OrderedMealDetails;
  };
  
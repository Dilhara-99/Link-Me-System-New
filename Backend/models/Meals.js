module.exports = (sequelize, DataTypes) => {
    const Meals = sequelize.define("Meals",{
        mealId: {
            type: DataTypes.STRING,
            allowNull: true,
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
}
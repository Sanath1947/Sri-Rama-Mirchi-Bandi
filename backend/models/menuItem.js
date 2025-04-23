const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MenuItem = sequelize.define('MenuItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modelUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return MenuItem;
}; 
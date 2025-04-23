const { Sequelize } = require('sequelize');
const User = require('./user');
const MenuItem = require('./menuItem');
const Order = require('./order');
const OrderItem = require('./orderItem');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

const models = {
  User: User(sequelize),
  MenuItem: MenuItem(sequelize),
  Order: Order(sequelize),
  OrderItem: OrderItem(sequelize),
};

// Define relationships
models.Order.belongsTo(models.User);
models.User.hasMany(models.Order);

models.OrderItem.belongsTo(models.Order);
models.Order.hasMany(models.OrderItem);

models.OrderItem.belongsTo(models.MenuItem);
models.MenuItem.hasMany(models.OrderItem);

module.exports = {
  sequelize,
  ...models,
}; 
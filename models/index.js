
const config = require("../configs/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
let category = require('./category.model')(sequelize, Sequelize);
let product = require('./product.model')(sequelize, Sequelize);

category.hasMany(product);
product.belongsTo(category);

db.category = category;
db.product = product;

module.exports = db;
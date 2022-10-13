
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
let user = require('./user.model')(sequelize, Sequelize);
let role = require('./role.model')(sequelize, Sequelize);

category.hasMany(product);
product.belongsTo(category);

role.belongsToMany(user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});

user.belongsToMany(role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
});

db.category = category;
db.product = product;
db.user = user;
db.role = role;

module.exports = db;
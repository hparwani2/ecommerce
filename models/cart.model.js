const { DataTypes } = require('sequelize');

module.exports = function(sequelize, Sequelize) {
    const cart = sequelize.define("cart", {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            autoIncrement: true
        },
        cost: {
            type: DataTypes.INTEGER
        }
    });
    return cart;
}
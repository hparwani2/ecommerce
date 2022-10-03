const { sequelize } = require('../connections/sequelize.connection');
const { DataTypes } = require("sequelize");

function initializeProductSchema() {
    const productSchema = sequelize.define("product", {
        id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0
        },
        category_id: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        }
    });

    return productSchema;
}

let productSchema = initializeProductSchema();

module.exports = {
    productSchema
}
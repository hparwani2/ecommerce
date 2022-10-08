const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        cost:{
            type: DataTypes.FLOAT,
            allowNull : false
        }
        
    },{
        tableName: 'products'
    });
    return Product;
}
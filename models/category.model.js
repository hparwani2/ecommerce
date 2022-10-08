const { DataTypes } = require('sequelize');
module.exports = function(sequelize, Sequelize) {
    const Category = sequelize.define("category", {
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
        }
    },{
        tableName: 'categories'
    });
    return Category;
}
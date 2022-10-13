const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    },{
        tableName: 'users'
    });
    return User;
}
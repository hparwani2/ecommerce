const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    },{
        tableName: 'roles'
    });
    return Role;
}
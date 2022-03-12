const { Sequelize, DataTypes } = require('sequelize')
const db = require('../utils/db')

module.exports = db.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    password: {
        type: DataType.STRING(40),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,  
    },
    privilege: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    tableName: 'admin'
})
const { Sequelize, DataTypes } = require('sequelize')
const db = require('../utils/db')

module.exports = db.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    pid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tb_product_category'
})
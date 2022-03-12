const { Sequelize, DataTypes } = require('sequelize')
const db = require('../utils/db')

module.exports = db.define('Avalue', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    tableName: 'tb_attribute_value'
})
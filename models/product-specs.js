const { Sequelize, DataTypes } = require('sequelize')
const db = require('../utils/db')

module.exports = db.define('Specs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attribute_key_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tb_product_specs'
})
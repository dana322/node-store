const { Sequelize, DataTypes } = require('sequelize')
const db = require('../utils/db')

module.exports = db.define('Akey', {
    attribute_key_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    attribute_key_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tb_attribute_key'
})
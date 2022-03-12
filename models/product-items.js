const { Sequelize, DataTypes } = require('sequelize')
const db = require('../utils/db')

module.exports = db.define('Item', {
    sku_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    images: {
        type: DataType.STRING(255),
        allowNull: false
    }, 
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    enable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tb_product_item'
})
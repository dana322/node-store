const { Sequelize, DataTypes } = require('sequelize')
const db = require('../utils/db')
//spu商品集

module.exports = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sub_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    product_sesc: {
        type: DataTypes.TEXT,
        allowNull: true
    }, 
    cid_1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cid_2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cid_3: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }, 
    saleable: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    vaild: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    packing_list: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    goods_number: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'tb_product'
})
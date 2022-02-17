const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('store', 'root', '123', {
    host: '39.105.40.188',
    dialect: 'mysql',
    define: {
        timestamps: true,
        createdAt: 'created_time',
        updatedAt: 'updated_time'
    }
})

sequelize.sync({force: false})

sequelize.authenticate()
    .then(()=> {
        console.log('数据库连接成功')
    })
    .catch(()=> {
        console.error('数据库连接失败', error)
        process.exit()
    })

module.exports = sequelize
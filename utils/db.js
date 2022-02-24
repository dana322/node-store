const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('store', 'debian-sys-maint', 'yJHGoYoQo3ZFNofV', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logQueryParameters:true,
    define: {
        timestamps: true,
        createdAt: 'created_time',
        updatedAt: 'updated_time',
    }
})


sequelize.authenticate()
    .then(()=> {
        console.log('数据库连接成功')
    })
    .catch(()=> {
        console.error('数据库连接失败', error)
        process.exit()
    })

module.exports = sequelize
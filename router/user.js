const Router = require('@koa/router')
const koaBody = require('koa-body')
const md5 = require('md5')

const User = require('../models/user')
const router = new Router()

router.post('/api/user/login', koaBody(), async (ctx, next) => {
    const {username, password} =  ctx.request.body
    console.log('reqest is :', username, password)

    const dbUser = await User.findOne({where: {name: username}})

    if (dbUser === null) {
        ctx.response.status = 200
        ctx.response.body = {
            errorCode: 101,
            errorMessage: '该用户未注册',
            data: {}
        }
    } else {
        if(dbUser.password !== md5(password)) {
            ctx.response.status = 200
            ctx.response.body = {
                errorCode: 102,
                errorMessage: '用户名或密码不正确',
                data: {}
            }
        } else {
            ctx.response.status = 200
            ctx.response.body = {
                errorCode: 0,
                errorMessage: '',
                data: '登录成功'
            }
        }
    }
})
router.post('/api/user/register', koaBody(), async(ctx, next) => {
    const {username, password, repassword} =  ctx.request.body
    console.log('reqest is :', username, password, repassword)
    return User.findOrCreate({
        where: {name: username},
        defaults: {
           name: username, 
           id: 0,
           sex: '女',
           birth_date: '2001-03-22',
           address: 'suibian',
           phone_number: '15512142322',
           photo: 'suibian',
           password: md5(password)
        }
    })
    .then(created => {
        if(created){
            ctx.response.status = 200
            ctx.response.body = {
                errorCode: 0,
                errorMessage: '',
                data: '注册成功'
            }
        } else {
            ctx.response.status = 200
            ctx.response.body = {
                errorCode: 3,
                errorMessage: '用户名已存在',
                data: {}
            }
        }
    })

})


module.exports = router
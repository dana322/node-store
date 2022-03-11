const Router = require('@koa/router')
const koaBody = require('koa-body')
const md5 = require('md5')

const User = require('../models/user')
const token2user = require('../utils/token2user')
const token = require('../utils/token')

const router = new Router()


router.post('/api/user/login', koaBody(), async (ctx, next) => {
    const {username, password} =  ctx.request.body

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
            ctx.request.user = dbUser
            ctx.cookies.set("token", token(dbUser))
        }
    }
})
router.post('/api/user/register', koaBody(), async(ctx, next) => {
    const {username, password, repassword} =  ctx.request.body
    //await 也行，虽然这个函数被调用了，
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
                errorCode: 103,
                errorMessage: '用户名已存在',
                data: {}
            }
        }
    })

})

router.use(token2user)
router.get('/api/user/logout', (ctx, next) => {
    ctx.cookies.set("token", "", {
        expires: new Date('December 17, 1995 03:24:00')
    })
    ctx.response.status = 200
})


router.get('/api/user/getUserInfo', (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = {
        errorCode: 0,
        errorMessage: '',
        data: ctx.state.user             
    }
})

module.exports = router
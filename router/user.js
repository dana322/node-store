const Router = require('@koa/router')
const koaBody = require('koa-body')
const router = new Router()

router.post('/api/user', koaBody(), (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'hello'
    console.log('reqest is :', JSON.stringify(ctx.request.body))
})


module.exports = router
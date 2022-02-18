const Router = require('@koa/router')

const router = new Router()

router.get('/api/user', (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'hello'
})

module.exports = router
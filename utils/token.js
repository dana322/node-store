const md5 = require('md5')

module.exports =  function (ctx, next) {
    //这时还没有ctx.states.user因为还没有use(token2user)
    const payload = [ctx.request.user.name, ctx.request.user.created_time]
    const signature = '12345679'
    const token = payload.concat(signature)

    ctx.request.token = md5(token)
    next()
}




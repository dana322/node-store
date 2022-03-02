const User = require('../models/user')

module.exports = function(ctx, next) {
    if(!ctx.request.token) {
        ctx.response.status = 200
        ctx.response.body = {
           errorCode: 104,
           errorMessage: '登录失效',
           data: {}
       } 
    } else {
        //ctx.request.user在login时存储user的信息
        //ctx.state.user是推荐的命名空间，用于通过中间件传递信息给前端视图
        ctx.state.user = ctx.request.user
        next()
    }
}
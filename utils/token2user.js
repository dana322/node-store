const User = require('../models/user')
const check = require('./check')

module.exports = function(ctx, next) {
    console.log('token 2 user 111111')
    console.log('token2user 逻辑开始前的ctxrequest is ', ctx.request.user.name)
    //check(ctx.cookies.get('token'), ctx.request.user)
    if(!ctx.cookies.get('token')) {
        console.log('token2user失效')
        ctx.response.status = 200
        ctx.response.body = {
           errorCode: 104,
           errorMessage: '登录失效',
           data: {}
       } 
    } else {
        console.log('state.user')
        //ctx.request.user在login时存储user的信息
        //ctx.state.user是推荐的命名空间，用于通过中间件传递信息给前端视图
        ctx.state.user = ctx.request.user
        console.log('token2user逻辑开始后的state user ', ctx.state.user.name)
    }
}
const utf8 = require("utf8")
const base64 = require("base-64")
const md5 = require("md5")

function get(token) {
    const bytes = base64.decode(token)
    const jsonToken = utf8.decode(bytes)
    return JSON.parse(jsonToken)
}

module.exports = async function(ctx, next) {
    console.log("真值是", !ctx.cookies.get)
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
        ctx.state.user = get(ctx.cookies.get('token')) 
        console.log('token2user逻辑开始后的state user ', ctx.state.user.name)
        next()
    }
}
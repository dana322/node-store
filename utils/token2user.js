const utf8 = require("utf8")
const base64 = require("base-64")
const md5 = require("md5")
const key = require("../constant/key")

function get(token) {
    const bytes = base64.decode(token)
    const jsonToken = utf8.decode(bytes)
    return JSON.parse(jsonToken)
}

//true是过期了
function checkTime(oldTime, newTime, hour) {
    //x小时等于？毫秒
    let time = hour * 60 * 60 * 1000
    if((newTime - oldTime) > time) {
        return true
    } else {
        return false
    }
}

function fail(ctx) {
        ctx.response.status = 200
        ctx.response.body = {
           errorCode: 104,
           errorMessage: '登录失效',
           data: {}
        }
}

module.exports = async function(ctx, next) {
    if(!ctx.cookies.get('token')) {
        fail(ctx) 
    } else {

        //验签
        const user = get(ctx.cookies.get('token'))
        const sign = (user.time + user.name + user.id + user.photo + user.sex + user.birth_date + user.address + user.photo_number + key)
        //判断时间戳有没有过期
        const currentTime = Date.now()
        const isOver = checkTime(user.time, currentTime, 2)
        
        if(user.sign != md5(sign)) {
            fail(ctx)
        } else if (isOver) {
            fail(ctx)
            ctx.cookies.set("token", "", {
                expires: new Date('December 17, 1995 03:24:00')
            })
        } else {
            //ctx.request.user在login时存储user的信息
            //ctx.state.user是推荐的命名空间，用于通过中间件传递信息给前端视图
            ctx.state.user = get(ctx.cookies.get('token')) 
        }
        next()
    }
}
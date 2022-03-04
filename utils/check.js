const utf8 = require("utf8")
const base64 = require("base-64")
const md5 = require("md5")

const signature = require('../constant/signature')


module.exports = function (token, user) {
    const bytes = base64.decode(token)
    const jsonToken = utf8.decode(bytes)
    const objToken = JSON.parse(jsonToken) 

    const payload = [user.name, user.created_time]
    const sign = signature
    const key = payload.concat(sign)

    if(objToken.key ===  md5(key)) {
        return true
    }
}
const md5 = require('md5')
const base64 = require('base-64')
const utf8 = require('utf8')
const key = require('../constant/key')

module.exports =  function (user) {
    const time = Date.now()
    const sign = (time + user.name + user.id + user.photo + user.sex + user.birth_date + user.address + user.photo_number + key)
    const message = {
        "name": user.name,
        "id": user.id,
        "photo": user.photo,
        "sex": user.sex,
        "birth_date":user.birth_date,
        "address": user.address,
        "photo_number": user.photo_number,
        "time": time,
        "sign": md5(sign)
    }
    const jsonUser = JSON.stringify(message)

    const bytes = utf8.encode(jsonUser)
    const encoded = base64.encode(bytes)

    return encoded
}




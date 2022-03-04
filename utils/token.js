const md5 = require('md5')
const base64 = require('base-64')
const utf8 = require('utf8')

const signature = require('../constant/signature')

module.exports =  function (user) {
    const payload = [user.name, user.created_time]
    const sign = signature
    const key = payload.concat(sign)

    const message = {
        "name": user.name,
        "id": user.id,
        "photo": user.photo,
        "sex": user.sex,
        "birth_date":user.birth_date,
        "address": user.address,
        "photo_number": user.photo_number,
        "created_time": user.created_time,
        "updated_time": user.updated_time,
        "token": md5(key)
    }
    const jsonUser = JSON.stringify(message)

    const bytes = utf8.encode(jsonUser)
    const encoded = base64.encode(bytes)

    return encoded
}




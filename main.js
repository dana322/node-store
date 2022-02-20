const Koa = require('koa')

const app = new Koa()

const registerRouter = require('./router')

app.use(registerRouter())

app.listen(3000)





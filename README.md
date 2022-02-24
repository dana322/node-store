# node-store

## question 1 怎样拆分路由
1. [方法1: 分别导出](https://blog.csdn.net/dyw3390199/article/details/114088178)
2. [方法2: koa-compose](https://www.jianshu.com/p/4a8654b69576)

## TODO
- [ ] 拆分路由方法二的原理，和glob
- [ ] 后端返回500， 登录失败怎么在前端体现

## get
1. 无论什么情况都返回200，和一个自定义的错误信息，例: 
   ```
   {
      errorCode: 0, //0代表没有，可以自己定义 
      errorMessage: 'xxx',
      data: {}
   }
   ```
   这样区分逻辑错误和网络错误

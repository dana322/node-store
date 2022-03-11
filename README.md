# node-store

## question 1 怎样拆分路由

1. [方法1: 分别导出](https://blog.csdn.net/dyw3390199/article/details/114088178)
2. [方法2: koa-compose](https://www.jianshu.com/p/4a8654b69576)

## TODO

- [ ] 拆分路由方法二的原理，和glob
- [x] 后端返回500， 登录失败怎么在前端体现
- [x] token这个字符串放在哪里

## get

1. **无论什么情况都返回200，和一个自定义的错误信息**，例: 

    ```
    {
       errorCode: 0, //0代表没有，可以自己定义 
       errorMessage: 'xxx',
       data: {}
    }
    ```

    这样区分逻辑错误和网络错误

2. **token**

    1. token的作用本质上是存用户信息的。因为ctx不能持久化。所以后端不知道每次来的是谁，所以要用到token里面存的用户信息

    2. token的组成部分

        1. 用户信息/用户身份标识符
        2. 时间戳
        3. 签名(sign)(使用摘要算法)
            1. token里的用户信息
            2. 时间戳
            3. 请求url，ip地址等

    3. 基于token的身份认证流程

        1. 用户登录，发起登录请求，后端检查用户密码，若成功登录，就发送token给客户端

        2. 客户端储存token

            1. token存在哪里

                * token可以设置在cookie里（前段不用写代码）

                * 可以设置在localStorage里

                * cookie会在每次发请求时自动携带。而localstorage需要前端手动发送

        3. 客户端每次请求携带token，服务端收到请求，验证token

            * 验证token的目的
               * 验证token是为了防止有人修改token。如果有人改变token的过期时间(根据token里的时间戳计算)，那么非常危险。如果有人复制了token，那么将一直不过期，在登录状态
            * 怎么验证token
               * 因为验证token的目的是为了防止有人修改，所以后端收到请求后要获取请求携带的token，按照加密时候的规则重新加密一下，这个结果和token的sign比较，如果一致说明token没有被改动(token的sign是第一次登录时设置的)

        4. 当用户手动登出，token过期时，删除token，登录失效，当用户token验证失败后登录失效

3. **为什么每次值user了一次token2user后面的api都有用户信息？**

    > 比如有a b c d e f g 这几个路由，第一次发送请求时命中了a c，第二次可能命中a d，如果a有next，那么进入d， 如果没有，那么就结束本次请求，因为token2user没有地址，是api路由，每次请求都会命中，所以后续的路由才会有user信息

4. **Data.now()是时间戳，是一串数字， new Date是时间对象，有tostring方法**
    ![](https://gitee.com/dananboom/imgs/raw/master/20220311192029.png)

 

## 错误码

### 特殊

* 0 无错误

### 用户

* 101 用户未注册
* 102 用户名或密码不正确
* 103 用户名已存在
* 104 登录失效
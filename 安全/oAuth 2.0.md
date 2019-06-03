[OAuth 2.0 的四种方式](http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)<br>
[OAuth 2.0 的一个简单解释](http://www.ruanyifeng.com/blog/2019/04/oauth_design.html)

> 目前最流行的授权机制，用来授权第三方应用，获取用户数据。系统从而产生一个短期的进入令牌(token)，用来代替密码，供第三方应用使用

### 栗子
1. 居民小区 -- 存储用户数据的网络服务； eg: 微信存储了我的好友信息，获取这些信息，就必须经过微信的"门禁系统"。
2. 快递员 -- 第三方应用；想要传递门禁系统，进入小区，派送快递。
3. 我就是用户本人，同意授权第三方应用进入小区，获取我的数据。

### 令牌和密码
令牌(token)和密码(password)的作用一致，用于进入系统，但有三点差异。

* 令牌是短期的，到期自动失效，用户无法修改。密码一般长期有效，用户不修改，就不会发生变化。
* 令牌可以被数据所有者撤销，会立即失效。密码一般不允许被他人撤销。
* 令牌有权限范围(scope)，比如只能进入小区的二号门。对于网络服务来说，只读令牌就比读写令牌更安全。密码一般是完整权限。

上面这些设计，保证了令牌既可以让第三方应用获得权限，同时又随时可控，不会危及系统安全。这就是 OAuth 2.0 的优点。

**令牌必须保密，泄露令牌与泄露密码的后果是一样的。**


### 四种授权方式

#### RFC 6749
OAuth 2.0 的标准是[RFC6749](https://tools.ietf.org/html/rfc6749)。

注意，不管哪一种授权方式，第三方应用申请令牌之前，都必须先到系统备案，说明自己的身份，然后会拿到两个身份识别码：客户端ID（client ID）和客户端密钥（client secret）。这是为了防止令牌被滥用，没有备案过的第三方应用，是不会拿到令牌的。

#### 第一种授权方式：授权码
> 授权码(authorization code)方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌。

适用于有后端的Web应用，授权码通过前端传送，令牌则是存储在后端，而且所有与资源服务器的通信都在后端完成。

前后端分离，可以避免令牌泄露。

![1.png](https://github.com/AngellinaZ/learn/blob/master/%E5%AE%89%E5%85%A8/images/1.png)


1. A网站提供一个链接，用户点击后就会跳转到B网站，授权用户数据给A网站使用。
下面就是 A 网站跳转 B 网站的一个示意链接。
```js
https://b.com/oauth/authorize?
    response_type=code&  //表示要求返回授权码(code)
    client_id=CLIENT_ID&   //让B知道谁在请求
    redirect_uri=CALLBACK_URL&  //B接受或拒绝请求后的跳转网址 
    scope=read  //授权范围（只读）
 ```
 
 2. 用户跳转后，B 网站会要求用户登录，然后询问是否同意给予 A 网站授权。用户表示同意，这时 B 网站就会跳回redirect_uri参数指定的网址。跳转时，会传回一个授权码，就像下面这样。
 ```js
//code参数就是授权码
https://a.com/callback?code=AUTHORIZATION_CODE  
```

3. A 网站拿到授权码以后，就可以在后端，向 B 网站请求令牌。
```js
https://b.com/oauth/token?
     client_id=CLIENT_ID&                //用于让 B 确认 A 的身份
     client_secret=CLIENT_SECRET&    //用于让 B 确认 A 的身份(client_secret参数保密，只能在后端发送请求)
     grant_type=authorization_code& //表示采用的授权方式是授权码
     code=AUTHORIZATION_CODE&  //上一步拿到的授权码
     redirect_uri=CALLBACK_URL       //令牌颁发后的回调网址
```

4. B 网站收到请求以后，就会颁发令牌。具体做法是向redirect_uri指定的网址，发送一段 JSON 数据。
```js
{    
    "access_token":"ACCESS_TOKEN",   //令牌，A网站在后端拿到了
    "token_type":"bearer",
    "expires_in":2592000,
    "refresh_token":"REFRESH_TOKEN",
    "scope":"read",
    "uid":100101,
    "info":{...}
 }
```

#### 第二种授权方式：隐藏式    
> 允许直接向前端颁发令牌。这种方式没有授权码这个中间步骤，所以称为（授权码）"隐藏式"（implicit）

适用于纯前端应用。

![2.png](https://github.com/AngellinaZ/learn/blob/master/%E5%AE%89%E5%85%A8/images/2.png)

1. A 网站提供一个链接，要求用户跳转到 B 网站，授权用户数据给 A 网站使用。
 ```js
https://b.com/oauth/authorize?
    response_type=token&  //表示直接返回令牌
    client_id=CLIENT_ID&
    redirect_uri=CALLBACK_URL&
    scope=read
```

2. 用户跳转到 B 网站，登录后同意给予 A 网站授权。这时，B 网站就会跳回redirect_uri参数指定的跳转网址，并且把令牌作为 URL 参数，传给 A 网站。
```js
//token参数就是令牌，A 网站因此直接在前端拿到令牌
https://a.com/callback#token=ACCESS_TOKEN 
```

#### 第三种授权方式：密码式
> 如果你高度信任某个应用，RFC 6749 也允许用户把用户名和密码，直接告诉该应用。该应用就使用你的密码，申请令牌，这种方式称为"密码式"（password）。

适用于用户高度信用的应用。

1. A 网站要求用户提供 B 网站的用户名和密码。拿到以后，A 就直接向 B 请求令牌。
```js
https://oauth.b.com/token?
    grant_type=password&  //表示授权方式为’密码式‘
    username=USERNAME&
    password=PASSWORD&
    client_id=CLIENT_ID
```
2. B 网站验证身份通过后，直接给出令牌。注意，这时不需要跳转，而是把令牌放在 JSON 数据里面，作为 HTTP 回应，A 因此拿到令牌

#### 第四种授权方式：凭证式
>凭证式（client credentials），适用于没有前端的命令行应用，即在命令行下请求令牌。

适用于没有前端的命令行应用。

1. A 应用在命令行向 B 发出请求
```js
https://oauth.b.com/token?
    grant_type=client_credentials&  //表示采用凭证式
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET
```
2. B 网站验证通过以后，直接返回令牌。

这种方式给出的令牌，是针对第三方应用的，而不是针对用户的，即有可能多个用户共享同一个令牌。


### 令牌的使用
每个发到 API 的请求，都必须带有令牌。具体做法是在请求的头信息，加上一个Authorization字段，令牌就放在这个字段里面。
```js
curl -H "Authorization: Bearer ACCESS_TOKEN" \
"https://api.b.com"
```
`ACCESS_TOKEN`就是拿到的令牌

### 更新令牌
B 网站颁发令牌的时候，一次性颁发两个令牌，一个用于获取数据，另一个用于获取新的令牌（refresh token 字段）。令牌到期前，用户使用 refresh token 发一个请求，去更新令牌。
```js
https://b.com/oauth/token?
    grant_type=refresh_token&  //表示要求更新令牌
    client_id=CLIENT_ID&         //用于确认身份
    client_secret=CLIENT_SECRET&  //用于确认身份
    refresh_token=REFRESH_TOKEN //用于更新令牌的令牌
```

B 网站验证通过以后，就会颁发新的令牌

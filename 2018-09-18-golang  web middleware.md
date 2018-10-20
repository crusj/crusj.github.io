---
layout: post
title: golang web middleware
category: golang
tags: middleware
---

个人理解golang中http中间件为一个请求链中的一环,用来对真正的请求处理进行一些预处理、如权限验证,参数处理或者辅助
进行日志记录等操作,与真正的业务处理分离

---
实现一个demo中间件，验证请求来源ip,让某个ip无法访问网站

---

## golang http包接口分析

**http包代码** 

```golang
package http 

type Handler Interface{
   ServeHTTP(ResponseWriter, *Request)
}

type HandlerFunc func(ResponseWriter, *Request)

func (f HandlerFunc) ServeHTTP(w ResponseWriter,r *Request) {
    f(w, r)
}
```
**分析** 

* 以上为http库内置的http处理接口,其中Handler接口有一个ServeHttp接口函数，在处理请求的时候，会调用此函数
对接口进行处理。
*  任何实现了次接口的类型都可以作为http.ListenAndServe(string, Handler)中的第二个Handler类型参数进行
请求处理。
* 以上代码中HandlerFunc 就是包内置的默认的实现Handler接口的一种方式。也可以自定义。

---

## 自定义实现Handler,不使用http包内的HandlerFunc

**代码**

```golang
type MyHandler struct {
    
}

func (mh *MyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    //do something
    
    // return result
    w.String(200, "hello world")
}

func main() {
    http.ListenAndServe(":1234",&MyHandler{})
}

```
**分析**

* 以上MyHandler实现了HTTP包中Handler接口(ServeHTTP方法)，定义了自己处理接口逻辑

---

### 使用函数型

**代码**

```golang
//handler Func
func MyHandlerFunc(h http.HandlerFunc) http.HandlerFunc {
    return func(rw http.ResponseWriter, req *http.Request) {
    //do something for example print verse
        rw.Write([]byte("昨夜星辰昨夜风"))
        h(rw, req)
    }
}
func main() {
    err := http.ListenAndServe(":12345", MyHandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
             w.Write([]byte("hell world 123456"))
    }))
    if err != nil{
        log.Fatal(err)
    }
}
```
**分析**

* 以上没有实现自己的Handler,而是实现了与http.handlerFuc相同签名的函数，相当于使用了http包内实现的HandlerFunc
,http包会调用Handler的ServeHTTP方法，然后在ServeHTTP中调用HandlerFuc


### 总结

* http.ListenAndServe("",Handler),中的Handler可以传两类，第一类是实现http.Handler的ServeHTTP方法的任意类型，
第二类是与http.HandlerFuc具有相同签名的函数，以为http.HandlerFuc实现了http.Handler的ServeHTTP,不需要我们再去实现。
* 而所谓的http中间件,就是重新实现实现Handler接口或者定义将真正的业务处理部分函数HandlerFunc作为参数传递给中间件函数壳
在壳内进行附加操作后，如果满足需求或者其他，然后再调用处理部分函数。


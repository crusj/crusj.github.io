---
layout: post
title: golang tips
category: golang
tags: tips
---

golang一些简单的知识点记录
<!-- more -->
## make与new

* new类型分配变量零值，返回指针
* make 只用于smc  slice map chan 三种类型

## 类型转化

* 类型转化,v.(type) 需要转换的类型
```golang
   type data map[string]interface{} 
   var sub  = data{
       "zhangsan":"张三",
       "lisi":"李四",
   }  
   var parent data
   parent["sub"] = sub
   for k, v := range parent["data"].(data) {
       fmt.Printf("%s,%s", k, v)
   }
```
* 类型断言
```golang
    //单一类型断言,断言变量类型一定要是接口类型，因此讲此变量赋值给一个空接口变量
    type emptyInterface interface{}//空接口
    var v emptyInterface
    v = variable
    if _,ok := v.(string);ok{
        printf("variable is type of string")
    }else {
        printf("variable is not type of string")
    }
    
    //多类型断言
    switch i := v.(type) {
        case "int32":
        case "float64":
    }
```

## 字符串转整形

> strconv.ParseInt(s string, base int, bitSize int) int64 error

* s 要转换的的字符串
* base 字符串类型，可选0 8 10 16,　其中8、10、16 代表字符串进制如果为0将通过string前缀自行判断，如0代表８进制，0x１６进制
* bitSize 整形的位数，8 16 32 64,如果整数大于位数能代表最大数字，如("128",10,8)将返回bitSize所能代表的最大数字127

## 生成范围内随机整数

```golang
func randInt(start, end int) (i int) {
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    if start > end {
        return end
    }
    i = r.Intn(end-start) + start
    return
}
```

## 获取程序传入参数

> func Int(name string, value int, usage string) *int 

> func String(name string, value string, usage string) *string 


```golang
total := flag.Int("total", 100000, "how many log want to create")
filePath := flag.String("filePath", "/home/jianglong/log/nginx/dig2", "log file path")
flag.Parse()
fmt.Println(*total, *filePath)
```

## 文件管理

### 写入文件

####  追加写入

> func (f *File) Write(b []byte) (n int, err error)

```golang
file, err := os.OpenFile(*filePath, os.O_RDWR|os.O_APPEND|os.O_CREATE, 0644)
if err != nil {
    fmt.Println(err)
}
defer file.Close()
logStr := "我是追加的方式写入的内容,如果不存在就创建文件"
_,err := file.Write([]byte(logStr))
if err != nil {
    fmt.Println(err)
}

```

#### 覆盖文件

> func WriteFile(filename string, data []byte, perm os.FileMode) error 

```golang
err := ioutil.WriteFile(file_path,[]byte("我是覆盖写入的内容"),0644)
if err != nil {
    fmt.Println(err)
}
```
## md5

```golang
hasher := md5.New()
hasher.Write([]byte("i am the content))
md5str := hex.EncodeToString(hasher.Sum(nil))
```

## ...变长参数
[内容参照](https://github.com/Unknwon/the-way-to-go_ZH_CN/blob/master/eBook/06.3.md)

```golang
package main
import "fmt"
   
func main() {
    x := min(1, 3, 2, 0)
    fmt.Printf("The minimum is: %d\n", x)
    slice := []int{7,9,3,5,1}
    x = min(slice...)
    fmt.Printf("The minimum in the slice is: %d", x)
}
   
func min(s ...int) int {
    if len(s)==0 {
        return 0
    }
    min := s[0]
    for _, v := range s {
        if v < min {
            min = v
         }
    }
    return min
}

```
## 格式化时间
```golang
time.Now().Format("2006-01-02 15:04:05")
```
## 修剪字符串
```golang
strings.Trim("hello","h") string
strings.TrimLeft("hello","h") string
strings.TrimRight("hello","o") string
```

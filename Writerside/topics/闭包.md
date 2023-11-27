# &#38381;&#21253;

## 概念
* 闭包是可以捕获外部变量的代码块。
* 根据对捕获变量的使用方式不同，**分为Fn**、**FnMut**、**Fn**三种类型。
* 三种类型约束：`Fn:FnMut:FnOnce`。
```mermaid
flowchart LR
    subgraph FnOnce 
        subgraph FnMut 
            Fn
        end
    end
```

## 判断方式
```mermaid
graph TD
    A{捕获外部变量}
    A-->|否|B[Fn]
    A-->|是|C[FnOnce]
    C-->D{移出变量所有权}
    D-->|是|C
    D-->|否|E[FnMut]-->F{改变变量值}
    F-->|是|E
    F-->|否|B
```
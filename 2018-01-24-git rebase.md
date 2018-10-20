---
layout: post
title: git利用rebase对多个commit进行压缩
category: git
tags: git
---
平常当进行**commit**的时候，可能对同一个问题进行了多次连续的commit,于是查看提交日志的时候出现一下情况

![多次重复提交][1]

此时就存在许多冗余的commit日志，单个任务的commit日志过于碎片化，不利于版本控制
### 利用rebase对冗余commit进行压缩
> git rebase -i commit_hash

* **-i**  interactive 交互
* **commit_hash** commit哈希值

如上图，我需要将commit665ca79到HEAD指针(44c13f5)压缩为一个commit
1. **git rebase -i 665ca79,进入vi交互界面<br/>**
2. **删除pick 44c13f5 update loading外的其它pick commit_hash commit_msg**
3. **修改pick 44c13f5 update loading为squash 44c13f5 update loading**
4. **保存退出,进入提交说明交互界面，修改新的提交说明,保存退出**
5. **如果成功，如下图，提交日志会变为如下**<br/>
![压缩提交][2]
6. **如果失败，如出现冲突，可先解决冲突，然后执行命令git add * && git rebase --continue**
7. **取消rebase,git rebase --abort**

### 分支rebase
![图片][3]

如上图图1中，在commit B创建了一个新分支**branch1**,在此之后**master**分支提交了两次，**C、E**，**branch1分支**提交了两次**D、F**<br/>

切换**branch1**分支，执行命令**git rebase master**，git会基于与**master**共同祖先也就**B**，开始对比差异，并且以**master**为基分支，将**B**后**branch1**所有提交压缩到一起作为一次提交**于master E**提交后，如图2

这样有一个好处是，当创建一个新分支**branch1**开发一些额外任务的时候,**master**分支也继续开发，当完成任务的时候**branch1**可能存在许多次提交。利用rebase **master**可以把**branch1**的所有与**master**基于共同提交点后(**B**)的提交压缩为一个，同时**branch1**分支看起来就像刚刚从**master**分支最新的**HEAD(E)**指针创建提交的，结构更加简洁
















[1]: {{ '/static/img/2018-02-24/commit1.png' | absolute_url }}
[2]: {{ '/static/img/2018-02-24/commit2.png' | absolute_url }}
[3]: {{ '/static/img/2018-02-24/rebase_branch.png' | absolute_url }}

轻量化共享系统
===============

没后台.就是随便写写.

可能有bug,请反馈.

C V的 https://cp.anyknew.com/ 这个网站

LOGO什么的自己改改吧,就一个控制器加2个页面.

## 安装

1.导入数据库

2.修改/application/database.php这个文件

## 说明

运行目录为 public

nginx在宝塔里自行设置一下伪静态 选择 thinkphp

控制代码在 application\index\controller\index.php

视图 application\index\view\index 这个文件夹

## 问题

问题1:下载不了文件?
答:最新版已经修复,请重新git一下或者修改\application\index\controller\index.php,129行
把 $filepath 那一行改为 $filepath = THINK_PATH . '../public' . $data['file_path'];

问题2:无法上传?
答:可能是PHP限制了文件上传.请修改php.ini
   修改\application\index\controller\index.php 45行	['size' => 20480000] 设置大一些(最新版已修复)

问题3:功能不好使?
答:请导入数据库!请导入数据库!请导入数据库!

注:阅完及焚,只是这个链接不能访问,数据库和文件依旧保留在服务器.这样有利于收集数据和方便以后寻找.

   所有控制逻辑都在 \application\index\controller\index.php 里 ,里面有非常详细的注释,自己看看就明白了!

## 作者

[KIENG博客](http://blog.kieng.cn "KIENG博客")
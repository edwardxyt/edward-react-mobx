# edward-React-Mobx 结构简单、功能强大、扩展性强的脚手架

## 需求配置 1

-   node ">= 8"
-   babel
-   webpack
-   no eslint 如果你喜欢可以自己添加

## 一、简介

edward-React-Mobx, 是基于 webpack4 react16.2 mobx5 react-router4 搭建的一套 spa 静态文件编译的脚手架。

主要特性包括：

1.  支持多域名，多项目下，一套 Ract 全家桶静态部署开发。
2.  区分 development' 'production' 'test'3 种环境。
3.  配置文件统一 合并或覆盖（localhost.settings.js 用于本地覆盖）、project.js 配置每一个项目的(api|cdn|libs)。
4.  模板引擎 hbs 用于入口模板；
5.  启动编译可传入参数如 --ENTRY --ENV。
6.  根据--ENTRY 来启动某一个项目或启动某一项目的测试服务器。
7.  根据--MOBILE 来识别启用 antd 还是 antd-mobile UI 框架。
8.  根据--ENV 开启 Vconsole、debug、或者 build 策略等。
9.  react-router4 按需加载。（react-loadable|asyncComponent）。
10. 使用 css-modules.
11. 使用 lodash 或 ramda 函数库。
12. 本地测试服务器使用 express 并 nodemon 守护进程。
13. webpack-dev-server 开发时服务器。
14. moment.js 时间处理。
15. axios、fetch
16. ua-parser-js User-Agent 查看等
17. 打包策略整体变化，包括 DLL 动态链接，HappyPack 子进程并行编译等。 18-06-28
18. 加入 less,className 用于第三方样式名和 less 样式、styleClass 用于 css in js。 18-07-27

note：部署推荐使用 nginx 处理。

## 二、2.0更新说明

无需在npm run dev --mobile=\* 这个参数

项目配置文件project.js里填写相应配置 mobile=null 将不会加载任何antd

采用happypack dll等 优化编译策略。

## 开始

目前 src 下有两个例子 git 和 demo（多项目多栏目根据目录结构），前者是手机端借鉴了[sanyuelanv](https://github.com/sanyuelanv/react-mobx-project)的案例并添加了 antd-mobile。后者是 web 的添加了 antd。

常用需要修改的，都在 config/index.js 里。除了 port 写在了 pkg 里，原因很简单，当你初次使用时，打开的是 pkg。启动 port 就在那直接修改。而不需要看源码。更暴力

页面中注入了 6 个变量分别是：**API**, **Y**, **ENV**, **DEBUG**, **PROJECT**

```bash
$ git clone https://github.com/edwardxyt/edward-react-mobx.git
$ cd edward-react-mobx
$ npm install                                                 # 安装
$ npm run dev --ENTRY=news/demo                               # 启动src/news/demo下的 mian.js （development、antd）
$ npm run dev --ENTRY=news/git               # 启动src/news/git下的 mian.js （development、antd-mobile）
$ npm run compile --ENTRY=news/demo --ENV=production          # 启动src/news/demo下的 mian.js （production、antd）
$ npm run compile --ENTRY=news/git --ENV=test   # 启动src/news/git下的 mian.js （test、antd-mobile）
$ npm run node:server --ENTRY=news/git                        # 启动node server

$ npm run tree                                                # 查看已有项目列表
```

开发过程中，你用得最多的会是`npm dev`，但是这里还有很多其它的处理：

| `npm run <script>` | 参数            | 解释                       |
| ------------------ | ------------- | ------------------------ |
| `dev`              | --ENTRY       | 启动开发服务器、传入--ENTRY 项目目录   |
| `compile`          | --ENTRY --ENV | 启动编译、--ENV 传入测试或生成，      |
| `node:server`      | --ENTRY       | 开启测试服务器传入--ENTRY 项目目录    |
| `tree`             | 无             | 提示已有项目目录列表               |
| `clean`            | 无             | 删除 node_modules 既 rm -rf |

启动参数解释

| `npm run --parameters` | 值                           | 解释           |
| ---------------------- | --------------------------- | ------------ |
| `--ENTRY`              | 例如:--ENTRY==news/git        | src 目录下的目录结构 |
| `--ENV`                | development production test | 环境模式         |

project.js 配置介绍

> project.js 是最小单位配置文件，用于配置项目的。（例如：news/git）

| `npm run --parameters` | 值          | 解释                             |
| ---------------------- | ---------- | ------------------------------ |
| `library`              | \[]        | 第三方库名称                         |
| `mobile`               | true false | 是否antd 或 antd mobile mull代表不引入 |
| `api_path`             | string     | 正式 fetch 地址                    |
| `y_api_path`           | string     | yapi mock 数据 fetch 地址          |
| `cdn_path`             | string     | 正式 静态文件部署地址                    |

## 程序目录

    .
    ├── README.md
    ├── bin  //执行文件
    │   ├── compile.js  //编译
    │   ├── del.js  //删除dist
    │   ├── node.server.js  //测试服务器
    │   └── tree.js  //已有项目列表
    ├── config  //配置文件
    │   ├── index.js  //变量配置文件
    │   ├── localhost.settings.js  //本地覆盖配置文件
    │   ├── project.js  //api & cdn 映射文件
    │   ├── webpack.vendor.config.js  //DLL动态链接
    │   └── webpack.production.config.js  //production时启用的
    ├── dist  //编译后的文件
    ├── package.json
    ├── postcss.config.js
    ├── src  //源码
    │   └── news
    │       ├── demo
    │       └── git
    ├── webpack.config.js  //development时启用的

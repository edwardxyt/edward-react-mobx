# edward-React-Mobx 结构简单、功能强大、扩展性强的脚手架

## 需求配置

* node ">= 8"
* babel
* webpack
* no eslint 如果你喜欢可以自己添加

## 一、简介

edward-React-Mobx, 是基于 webpack4 react16.2 mobx5 react-router4 搭建的一套 spa 静态文件编译的脚手架。

主要特性包括：

1.  支持多域名，多项目下，一套 Ract 全家桶静态部署开发。
2.  区分 development' 'production' 'test'3 种环境。
3.  配置文件统一 合并或覆盖;
4.  模板引擎 hbs 用于入口模板；
5.  启动编译可传入参数如 --ENTRY --ENV --MOBILE。
6.  根据--ENTRY 来启动某一个项目或启动某一项目的测试服务器。
7.  根据--MOBILE 来识别启用 antd 还是 antd-mobile UI 框架。
8.  根据--ENV 开启 Vconsole、debug、或者 build 策略等。
9.  react-router4 按需加载。
10. 使用 css-modules.
11. 使用 lodash 或 ramda 函数库。
12. 本地测试服务器使用 express 并 nodemon 守护进程。
13. webpack-dev-server 开发时服务器。
14. moment.js 时间处理。
15. axios、fetch

note：部署推荐使用 nginx 处理。

## 开始

目前 src 下有两个例子 git 和 demo（多项目多栏目根据目录结构），前者是手机端借鉴了[sanyuelanv](https://github.com/sanyuelanv/react-mobx-project)的案例并添加了 antd-mobile。后者是 web 的添加了 antd。

```bash
$ git clone https://github.com/edwardxyt/edward-react-mobx.git
$ cd edward-react-mobx
$ npm install                                                 # 安装
$ npm run dev --ENTRY=news/demo                               # 启动src/news/demo下的 mian.js （development、antd）
$ npm run dev --ENTRY=news/git --MOBILE=true                  # 启动src/news/git下的 mian.js （development、antd-mobile）
$ npm run compile --ENTRY=news/demo --ENV=production          # 启动src/news/demo下的 mian.js （production、antd）
$ npm run compile --ENTRY=news/git --ENV=test --MOBILE=true   # 启动src/news/git下的 mian.js （test、antd-mobile）
$ npm run tree                                                # 查看已有项目列表
```

开发过程中，你用得最多的会是`npm dev`，但是这里还有很多其它的处理：

| `npm run <script>` | 参数                      | 解释                                                                     |
| ------------------ | ------------------------- | ------------------------------------------------------------------------ |
| `dev`              | --ENTRY 、--MOBILE        | 启动开发服务器、传入--ENTRY 项目目录 。--MOBILE 开启 antd 或 antd-mobile |
| `compile`          | --ENTRY 、--MOBILE、--ENV | 启动编译、--ENV 传入测试或生成，                                         |
| `node:server`      | --ENTRY                   | 开启测试服务器传入--ENTRY 项目目录                                       |
| `tree`             | 无                        | 提示已有项目目录列表                                                     |

| `npm run --parameters` | 值                          | 解释                     |
| ---------------------- | --------------------------- | ------------------------ |
| `--ENTRY`              | 例如：--ENTRY==news/git     | src 目录下的目录结构     |
| `--MOBILE`             | true or false               | 开启 antd or antd-mobile |
| `--ENV`                | development production test | 环境模式                 |

## 程序目录

```
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
│   └── webpack.production.config.js  //production时启用的
├── dist  //编译后的文件
├── package.json
├── postcss.config.js
├── src  //源码
│   └── news
│       ├── demo
│       └── git
├── webpack.config.js  //development时启用的
```

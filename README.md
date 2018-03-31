# edward-React-Mobx 结构简单、功能强大、扩展性强的脚手架

## 需求配置

* node -v `~v8.9.1`
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

开发过程中，你用得最多的会是`npm dev`，但是这里还有很多其它的处理：

| `npm run <script>` | 参数                      | 解释                                                                     |
| ------------------ | ------------------------- | ------------------------------------------------------------------------ |
| `dev`              | --ENTRY 、--MOBILE        | 启动开发服务器、传入--ENTRY 项目目录 。--MOBILE 开启 antd 或 antd-mobile |
| `compile`          | --ENTRY 、--MOBILE、--ENV | 启动编译、--ENV 传入测试或生成，                                         |
| `node:server`      | --ENTRY                   | 开启测试服务器传入--ENTRY 项目目录                                       |
| `tree`             | 无                        | 提示已有项目目录列表                                                     |

| `npm run --参数解释` | 值                          | 解释                     |
| -------------------- | --------------------------- | ------------------------ |
| `--ENTRY`            | 例如：--ENTRY==news/git     | src 目录下的目录结构     |
| `--MOBILE`           | true or false               | 开启 antd or antd-mobile |
| `--ENV`              | development production test | 环境模式                 |

## 程序目录

```
.
├── README.md
├── bin
│   ├── compile.js
│   ├── del.js
│   ├── node.server.js
│   └── tree.js
├── config
│   ├── index.js
│   ├── localhost.settings.js
│   ├── project.js
│   └── webpack.production.config.js
├── dist
├── package.json
├── postcss.config.js
├── src
│   └── news
│       ├── demo
│       └── git
├── webpack.config.js
```

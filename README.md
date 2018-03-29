# edward-React-Mobx

## 初衷

由于 2018 年 react 技术栈，包括工具有整体版本提升。reaact(16.2)，react-router(4x)，webpack(4x)等等。从新写一套可以支持多环境，多项目，分别 build 的 react 脚手架。只为了实现 SPA 单页应用。部署需要 nginx。

### 问题

1.   环境有 development' 'production' 'test'，要区分是否压缩，是否生成 map，是否可调试，后端接口地址, 是否是移动端等问题；
2.  多项目，一套架构可以多入口，分别编译；
3.  配置文件统一 合并或覆盖，根据多项目多环境不同接口;
4.  html 文件，需要添加额外非 react 组件，要使用模板引擎 hbs;
5.  路由拦截实现;
6.  ajax 封装并统一错误处理;
7.  编译策略 根据多环境;
8.  代理问题;
9.  按需加载;
10. 工具函数库;
11. UI 库;

### 思路

1.  npm script 传参 包括（项目名、接口地址）
2.  dev、dep、test scripts 区分环境
3.  接口地址写入配置文件 
4.  提取配置文件策略，1.多次使用的字段 2.如果只用到一次，有可能在开发过程中变动的字段，既写入配置文件 反之不写入
5.  端口号为什么没有写入配置文件 而是写入了 pg，因为快捷修改启动代码而不需要 修改源码
6.  生成版本，不需要本地配置文件 所以不加载
7.  build 如果使用 babel-plugin-import 就报错，手动加载没问题

### 新问题

1.  如果在 bin 中执行 webpack 是否会更好 2018.03.22
2.  css-loader 出现报错，添加了 sourceMap 好使了 2018.03.23
3.  babel 开发模式下 提示文件不能大于 500K 2018.03.23
4.  "extract-text-webpack-plugin": "^4.0.0-beta.0", 才能兼容 webpack4 2018.03.23
5.  antd 按需加载 引入 css loader 错误，不能设定 exclude 和 include 2018.03.29
6.  antd 不支持 css-modules 2018.03.29
7.  antd compile 后 测试服务器 未知错误 2018.03.29 "libraryDirectory": "es" 原因

### 解决方案

1.  环境通过 npm script 传入 **ENV**
2.  **DEBUG** 通过判断 **ENV**来判断
3.  **CLUSTER** **PROJECT** 项目名与活动名 通过 node 传入

### 启动

npm run dev --ENTRY=news/demo
npm run compile --ENTRY=news/git --ENV="test"
npm run compile --ENTRY=news/git --ENV="production"
npm run node:server --ENTRY=news/git

### 简化易读

有些人喜欢把 webpack 做成 base.config、然后合并对象。生成对应的 development' or 'production'。但是我并不喜欢这种方式 首先模式下 只有 3 种 development' or 'production' 'test'。然后解耦的也并不是很多。且不易于读。我的策略是 不提取 baseConfg，只做整体项目的配置文件。这样易读 易于修改。

dev 是用的是 webpack-cli 启动
dep 是通过 node.run 还行的 webpackconfig

dep 查看效果 需要你起一个 node http server 查看，最简单的方式是安装 live-server.
由于我公司接口绑定域名了，所以接口联调需要本机起 nginx 修改 hosts 反向代理才可以响应，所以在这里我并没有安装 dep 下的服务，请小伙伴根据自己情况 选择适合方式查看代码。

### todos

1.  接口注入
2.  CDN 写入配置
3.  压缩
4.  lives 而 ever
5.  echo
6.  test 环境下也要输出 console

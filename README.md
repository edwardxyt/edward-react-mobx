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

### 新问题

1.  如果在 bin 中执行 webpack 是否会更好 2018.03.22
2.  css-loader 出现报错，添加了 sourceMap 好使了 2018.03.23
3.  babel 开发模式下 提示文件不能大于 500K 2018.03.23
4.  "extract-text-webpack-plugin": "^4.0.0-beta.0", 才能兼容 webpack4 2018.03.23

### 解决方案

1.  环境通过 npm script 传入 **ENV**
2.  **DEBUG** 通过判断 **ENV**来判断
3.  **CLUSTER** **PROJECT** 项目名与活动名 通过 node 传入

### 启动

npm run dev --ENTRY=news/demo

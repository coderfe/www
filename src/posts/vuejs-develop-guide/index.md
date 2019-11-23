---
title: Vue.js 开发不完全指南
date: 2018-12-09
path: '/vuejs-develop-guide'
tldr: 今年三月份到现在，一直在做 Vuejs 的 Web 开发。我想现在是时候回头看看，这近一年的开发，我们都经历了什么？我想这其中滋味，酸甜苦辣俱有。
tags: ['Vue']
---

## 开发阶段

这个项目是一款中后台管理系统，所以当时以 Vue.js 作为主框架进行开发，然后使用了 iView 作为 UI 框架。其中，其它部分就是 Vue 的生态了，例如 Vue Router 和 Vuex 等。

### 生成项目结构

最近 [@vue/cli][vue-cli] 发布了正式版 Vue CLI 3，但其实早在 3 月份就发布了测试版，所以当初使用了测试版 CLI 生成了项目结构。最近也升级成和最新版一致的了。CLI 工具还增加非常强大的功能，包括安装插件、可视化界面、配置文件等。

```shell
// 生成项目结构
vue create project-name

// 使用 UI 界面
vue ui
```

这部分就比较简单，关于项目结构，CLI 文档也有说明。

### 配置开发环境

最新版的 CLI 工具支持自定义配置，如果你在项目根目录下提供一个 `vue.config.js` 文件，cli 在启动项目时会自动加载这些配置项。这部分应该是比较有趣的一部分，而且把这些东西配置好之后，开发效率可以嗖嗖嗖的提升。

这一项里面，我最常用的是端口号和代理这两项，[webpack-dev-server][webpack-dev-server] 支持的配置项都可以集成进来。需要代理的原因是前后台是分离式开发，需要解决跨域问题（如果后台配置了 CORS，则不需要这项配置）。

```javascript
module.exports = {
  //...
  devServer: {
    port: 8081,
    proxy: 'http://localhost:8080',
  },
  //...
};
```

### 使用 webpack 插件

使用 webpack 插件比较简单，例如使用 [webpack-bundle-analyzer][webpack-bundle-analyzer] 来分析打包后各个模块的体积大小：

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

### webpack 链式操作 chainWebpack

这个配置项允许你对内部的 webpack 配置做出一些修改，例如添加一个新的 loader、修改插件的配置、为其它目录添加 vue 的支持等。但是 问题在于你可能不知道内部使用的 loader，那么这时候 `vue inspect` 这个命令会将内部配置输出在控制台，你可以查看想要修改的规则。看一下这个 🌰：

```javascript
// vue.config.js

// 修改 index.html 和 favicon.png 的路径
module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].template = 'path/to/index.html';
      args[0].favicon = 'path/to/favicon.png';
      return args;
    });
  },
};
```

这个功能使用了 [webpack-chain][webpack-chain] 的 API。

### 使用环境变量

如果你想在项目中使用环境变量，可以在项目的根目录下增加以下文件：

- `.env` 所有环境加载
- `.env.local` 所有环境 加载，会被 git 忽略
- `.env.[mode]` 在特定环境中加载
- `.env.[mode].local` 在特定环境中加载，会被 git 忽略

其中 mode 的值 可以是：`development`/`production`/`test`。

如何使用呢？假如在项目根目录下存在 `.env` 文件：

```
VUE_APP_TITLE=Hello World
```

此时，在项目代码中就可以这样访问它：

```javascript
console.log(process.env.VUE_APP_TITLE); // Hello World
```

如果运行 `yarn build` 进行构建，那么这个环境变量将会直接被替换对应的值。

### 浏览器兼容

如果要兼容 IE 则 需要安装 `babel-polyfill`。

```javascript
// main.js
import 'babel-polyfill'；
// ...
```

### 使用 JSX

提到 JSX，最先想到的是 React。其实 JSX 是可以独立存在的，它只是一种语法糖而已。所以在 Vue 中也可以使用。在 Vue CLI 3 中可以直接使用 JSX，而 2.x 版本则需要安装相应的依赖（[babel-plugin-transform-vue-jsx][babel-plugin-transform-vue-jsx]）。

我们项目的 UI 框架是 iView，在使用 Table 组件时经常要使用 `render` 函数，如下：

```javascript
export default {
  data() {
    return {
      columns: [
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [h('Button', '编辑'), h('Button', '删除')]);
          },
        },
      ],
    };
  },
};
```

但是如果 `render` 函数要处理很多元素的时候，它会显得非常臃肿，而且不易维护。那此时我们就可以使用 JSX 来优化代码：

```javascript
export default {
  data() {
    return {
      columns: [
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return (
              <div>
                <i-button>编辑</i-button>
                <i-button>删除</i-button>
              </div>
            );
          },
        },
      ],
    };
  },
};
```

> 注：如果你使用的是 Webstorm，可能会出现语法错误之类的警告。可以通过设置 `Settings -> Languages & Frameworks -> Javascript -> Javascript language version -> React JSX` 来解除报错。

## 性能优化

### 代码分割 & 路由懒加载

 代码分割是什么意思呢？正常来说，在你使用 `yarn build` 构建之后， `dist` 文件下会生成一个如几个文件，默认情况下没有开启代码分割。

![dist-js](https://ws1.sinaimg.cn/large/e7aabc75ly1fxo489h9aaj20pg052my4.jpg)

例如有如下路由：

```javascript
import Home from './views/Home.vue';
import About from './views/About.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

export default routes;
```

这是我们经常使用的路由加载方式，没有代码分割。那我们如何使用代码分割功能呢？ 这时我们就可以根据路由对代码进行分割了：

```javascript
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
];

export default routes;
```

这样改造完之后，我们再运行 `yarn build`：

![dist-chunk-js](https://ws1.sinaimg.cn/large/e7aabc75ly1fxo4sch1gdj20qc08e0uu.jpg)

在原来的基础上又增加了 2 个 js 文件和 2 个 css 文件，这正是代码分割的作用。只有在访问相应路由时再去加载对应的 js 和 css 文件。

### 分析并压缩代码体积

在编写大型程序时，难免会遇到打包后 js 文件体积过大的问题，因为项目可能会引入第三方依赖，在一定程度上加重了这个问题。那如何解决呢？

1. 代码分割，按需加载
2. 分析打包后的代码
3. 剥离第三方库

首先，代码分割上面已经说了。

如何分析打包后的代码呢？运行 `yarn build` 时提供参数 `--report`：

```shell
yarn build --report
```

运行上述命令之后，会在 `dist` 下生成 `report.html`，打开它可以看到：

![build-report](https://ws1.sinaimg.cn/large/e7aabc75ly1fxo55j0uevj21z410y7be.jpg)

 各个色块代表了相应的 js 所占用的空间。面积越大的体积就越大。

那如何优化呢？在使用了路由懒加载之后，性能会有比较明显的提升。但是我们还需要进一步优化：剥离第三方库。

 何为剥离？因为项目使用 iView 作为 UI 框架，然后还有 Vuex 和 vue-router 这几个 依赖框架。 正常情况下，这些框架和其他一些依赖都会被打包进 `dist/chunk-venders.[hash].js` 中，因此， 可能会得到一个很大（5M+）的 js 文件。但是我们可以通过将这些 js 以 CDN 的方式引入，这样 就可以避免 `chunk-venders.[hash].js` 文件过大：

```javascript
// vue.config.js
module.exports = {
  // ...
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      iview: 'iview',
    },
  },
};
```

在 `public/index.html` 中添加以下内容：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <!-- 要添加的 css -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/iview@3.1.5/dist/styles/iview.css"
    />
    <!-- 要添加的 css -->
    <title>vue-test-demo</title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but vue-test-demo doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- 要添加的 js -->
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.runtime.min.js"></script>
    <script src="https://unpkg.com/vuex@3.0.1/dist/vuex.min.js"></script>
    <script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.min.js"></script>
    <script src="https://unpkg.com/iview@3.1.5/dist/iview.js"></script>
    <!-- 要添加的 js -->
    <!-- built files will be auto injected -->
  </body>
</html>
```

如果是其它的第三方库，写法都一样。再次运行 `yarn build` 之后， 可以看到 `chunk-venders.[hash].js` 文件的体积会明显变小。

### 启用 gzip

HTTP 协议中的 gzip 是用来改进性能的，它的压缩比率大概在 3 到 10 倍之间，可以大幅节省网络带宽，但是会增加服务器 CPU 的负担。目前主流浏览器都支持 gzip 解码，所以一般只需要服务端启用 gzip 即可。

[vue-cli]: https://github.com/vuejs/vue-cli
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server/
[webpack-bundle-analyzer]: https://github.com/webpack-contrib/webpack-bundle-analyzer
[webpack-chain]: https://github.com/neutrinojs/webpack-chain
[compression-webpack-plugin]: https://github.com/webpack-contrib/compression-webpack-plugin
[babel-plugin-transform-vue-jsx]: https://github.com/vuejs/babel-plugin-transform-vue-jsx

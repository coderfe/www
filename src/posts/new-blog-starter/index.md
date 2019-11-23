---
title: 重构博客——开发环境搭建
date: 2017-01-02
path: "/new-blog-starter"
tldr: 在 2016 年年末，为 2017 年定下了几个小目标，其中之一便是重构这个博客站点。刻不容缓，现在就开始来实现这个小目标。技术栈：前端基于 Vuejs 和 Element-UI ，后端主要用 Nodejs & Express 搭建而成，数据库则是用了 MongoDB ，前后端通信基于 Ajax ！
---

其实 JavaScript 全栈开发已经兴起好长时间了，现在终于有机会来尝试一下，只用一门语言就可以开发前后端（JavaScript => JSON => JavaScript），并实现前后端分离（后端只提供接口，前后端用 JSON 进行交互）。本文也将分为前端和后端两个模块来介绍开发环境的搭建。

[源码地址 GitHub](https://github.com/coderfe/vue-blog)

## 项目结构

- server —— 后端

  - `server/router` —— 后端路由
  - `server/models` —— 数据库相关
  - `server/config` —— 项目配置
  - `app.js` —— 后端入口文件

- client —— 前端

  - 使用 vue-cli 生成前端目录
    ```shell
    npm i -g vue-cli
    vue init webpack
    ```
  - `client/src/main.js` —— 前端入口文件
  - `client/src/router.js` —— 前端路由

## 后端

目前 Express 可以说是最流行的 Nodejs 服务端框架了，而且国内也有基于 Express 框架的网站，总体看来，是一个非常成熟的可用的框架。后端用到的框架有：

- [express](https://github.com/expressjs/express) —— Web 服务框架
- [body-parser](https://github.com/expressjs/body-parser) —— request body 解析中间件
- [cors ](https://github.com/expressjs/cors)—— 支持跨域
- [morgan](https://github.com/expressjs/morgan) —— HTTP 请求记录中间件
- [mongoose](https://github.com/Automattic/mongoose) —— 数据库操作

## 前端

前端主要用 [Vuejs](http://vuejs.org/) + [Element-UI](http://element.eleme.io) 来实现。目前暂时用 Element-UI ，可能会切换到其他的 UI 组件库。前端用到的框架有（排除 vue-cli 自动添加的）：

- [vue-router](https://www.npmjs.com/package/vue-router) —— 为 vuejs 添加路由支持
- [element-ui](https://github.com/ElemeFE/element) —— 饿了么开发的 vue2.0 前端组件库
- [axios](https://github.com/mzabriskie/axios) —— 基于 Promise 的 HTTP 客户端
  - 如果你熟悉 vue-resource ，可以这样在 **main.js** 中添加如下代码：
    ```javascript
    import Vue from 'vue';
    import axios from 'axios';
    Vue.property.$http = axios;
    ```

## 数据库

数据库的安装可以参考 [MongoDB 文档](https://www.mongodb.com/) 。

数据库采用了轻量级的 MongoDB 来开发，不同于传统的 SQL 数据库，它属于 NOSQL 数据库，我们可以来对比一下两种数据库：

| SQL Database | MongoDB          | 解释                      |
| ------------ | ---------------- | ----------------------- |
| database     | database         | 数据库                     |
| table        | collection       | 数据表/集合                  |
| row          | document         | 数据行记录/文档                |
| column       | field            | 数据字段/域                  |
| index        | index            | 索引                      |
| primary key  | primary key(_id) | 主键，MongoDB 自动设置 _id 为主键 |

在开发过程中会使用 [mongoose](http://mongoosejs.com/) 来操作数据库，它提供了良好的数据库操作 API 。

这一篇就当作是重构博客的开端。下一篇就来聊聊**数据库的实现**。

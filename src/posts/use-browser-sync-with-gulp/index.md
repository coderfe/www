---
title: Gulp and Browser-sync
date: 2016-07-20
path: "/use-browser-sync-with-gulp"
tldr: 我今天发现利用 browser-sync 可以同时在 PC 和 移动端预览效果，我承认我发现的有点晚😅。。。
tags: ["Gulp"]
---

### 安装

```shell
npm install -g browser-sync gulp
```

### 启动服务

可以和 `gulp` 搭配使用，也可以单独使用，通常我都是搭配 `gulp` 使用的，但在这里仅作演示。通过以下命令可以启动一个小型的服务器，并监听文件变化。

```shell
# *号代表要监听的文件，可以使任何文件
browser-sync start --server --file "*"
```

此时，会在默认浏览器中打开一个窗口并自动访问 [http://localhost:3000](http://localhost:3000) ，同时呢，命令行会显示一下内容：

```shell
[BS] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.103:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.103:3001
 --------------------------------------
[BS] Serving files from: ./
```

**用你的移动设备打开 [http://192.168.1.103:3000](http://192.168.1.103:3000) ，你会看见网页会呈现在你面前，而且设备间可以同步进行滚动等操作，调试响应式网站简直不要太好用😎**

**[http://localhost:3001](http://localhost:3001) 这个地址是一个可视化操作的界面，可以在这个网页中配置 `browser-sync` 的相关服务，很神奇，有木有？**

### gulp & browser-sync

```shell
npm install gulp browser-sync --save-dev
```

**gulpfile.js**

```javascript
var gulp = require('gulp'),
	browserSync = require('browser-sync').create();

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
```

最后在命令行中运行 `gulp server`

### Others

其实利用 `gulp` 可以做的事情很多很多，编译 `SCSS` 、压缩代码/图片等等。前端自动化的任务交给它就可以了。

---
title: 优化博客性能
date: 2016-05-07
path: "/optimize-blog-performance"
tldr: 今天发现博客首页的加载速度比较感人，于是就用 Google 出品的 Pagespeed Insights 检测了一下，发现了不少问题，而且这些问题都严重拖慢了加载时间。
tags: ["性能优化"]
---

- HTML / CSS / JS / Photos 都是未压缩状态
- 部分静态资源没有设置缓存
- CSS 出现阻塞，即首页出现空白的情况

暂时只解决了第一个问题：

- 修改一下 `Travis CI` 的部署脚本 `.travis.yml` 即可实现自动压缩（利用 `gulpjs`）：
```bash
  install:
  - npm install hexo-cli gulp -g
  - npm install

  script:
  - hexo clean
  - hexo g
  - gulp
  - hexo d
  ```

查看 [`gulpfile.js`](https://github.com/coderfe/blog/blob/master/gulpfile.js) 配置

- 优化之后，加载速度明显提升了。剩下的几个问题还得研究一下

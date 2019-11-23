---
title: IE8 兼容性总结
date: 2016-08-08
path: "/ie8-compatibility"
tldr: 这几周经历了一个项目，要兼容到 IE8 浏览器，在开发过程中踩了不少的坑，尤其是 flexbox 布局，Chrome 和 Firefox 完全兼容，但是 IE8 就没那么轻松了。既然坑踩了，那么就总结下来这些 IE8 常见的兼容性问题，以免以后再踩到以一毛一样的坑（应该不会了，IE8 的寿命也许不长了吧）！
tags: ["CSS"]
---

## rgba 颜色格式

- IE8 不支持 `rgba(0, 0, 0, .5)` 这种颜色格式。
- 解决方案：可以利用一张半透明的 **png** 图片来兼容 IE8。

## flexbox

- 根据 [caniuse](caniuse.com) 给出的数据，IE8 是不支持 `flex` 布局属性的， 甚至 IE11 只支持一部分。
- 解决方案：利用 `display: inline-block` / `display: table` / `display: inline` 来实现部分兼容。
- [Almost complete guide to flexbox (without flexbox)](https://kyusuf.com/post/almost-complete-guide-to-flexbox-without-flexbox)，介绍了一些不用 `felx` 属性来完成 `flexbox` 布局的技术，很有参考价值，推荐。
- [Flexbox Patterns](http://www.flexboxpatterns.com/site-header)，一些利用 `flex` 实现常用的布局的例子，推荐参考。

## HTML5

- 非常遗憾，HTML5 新增的标签在 IE8 里是不受支持滴，例如：`section` / `main` / `header` / `footer` 等。
- 解决方案：[html5shiv](https://github.com/aFarkas/html5shiv)，这个脚本可以实现兼容 IE8 。

## media query

- 非常非常遗憾，IE8 也不支持 `media query` 。
- 解决方案：[Respond.js](https://github.com/scottjehl/Respond)

## CSS3 新特性

- IE8 支持的 CSS3 新特性仅有 20% ，具体可以查看 [caniuse](http://caniuse.com/#search=css3) 。
- 解决方案：[css3pie](https://github.com/lojjic/PIE)，目前 css3pie 可以支持的功能有：
  - border-radius
  - box-shadow
  - border-image
  - multiple background images
  - linear-gradient as background image

## 以上

以上就是我在实践项目中遇到的 IE8 兼容性问题以及我自己的解决方案。如果你有更好的解决方案或者 IE8 兼容性问题，欢迎讨论：[https://www.gitbook.com/book/coderfe/notes/discussions](https://www.gitbook.com/book/coderfe/notes/discussions)

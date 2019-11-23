---
title: CSS 中有趣的 filter 属性
date: 2016-07-25
path: "/css-filter-property"
tldr: 昨天在 Sitepoint 看到一篇文章，是关于 CSS 的 filter 属性的，觉得有趣，把它翻译过来。
tags: ["CSS"]
---

### 语法

```css
  el {
    filter: none | filter-function | filter-function;
  }
```

### 效果展示

<p data-height="734" data-theme-id="light" data-slug-hash="oLdyEV" data-default-tab="result" data-user="coderfee" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/coderfee/pen/oLdyEV/">oLdyEV</a> by Simon (<a href="http://codepen.io/coderfee">@coderfee</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### 注释

上面的效果依次是：

- 第一张为原图
- 亮度 `brightness(60%)`
- 对比度 `constrast(150%)`
- 灰度 `grayscale(100%)`
- 饱和度 `saturation(180%)`
- 棕褐色 `sepia(100%)`
- 色相旋转 `hue-rotate(90deg)`
- 色相旋转 `hue-rotate(180deg)`
- 色相旋转 `hue-rotate(270deg)`
- 反色 `invert(100%)`
- 模糊 `blur(1px)`
- 透明度 `opacity(65%)`
- 阴影 `drop-shadow(5px 5px 10px #666)`

这些“滤镜”可以叠加使用。有时可能需要用一张图片做成不同效果，这时 `filter` 属性就可以派上用场，省去了P图的时间。

### 详细说明

| filter      | 默认值  | 说明                     |
| ----------- | ---- | ---------------------- |
| blur        | 0    | 不接受百分比，数值越大越模糊         |
| brightness  | 1    | 数值超过100%，图像更亮          |
| contrast    | 1    | 数值超过100%，对比度更低         |
| drop-shadow |      |                        |
| grayscale   | 0    | 值为100%时为灰度图像，0% - 100% |
| hue-rotate  | 0deg | 无最大值                   |
| invert      | 0    | 100%完全反转，0% - 100%     |
| opacity     | 1    | 0%完全透明，0% - 100%       |
| saturate    | 1    | 0%完全不饱和，超过100%饱和度      |
| sepia       | 0    | 100%为完全深褐色，0% - 100%   |


### 参考链接

[CSS Filter Effects: Blur, Grayscale, Brightness and More in CSS!](https://www.sitepoint.com/css-filter-effects-blur-grayscale-brightness-and-more-in-css/)

### 更新日志

> 2016-08-08 增加详细说明

> 2016-07-27 更改错别字


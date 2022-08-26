<div align="right">
  语言:
  中文
  <a title="English" href="/README_EN.md">English</a>
</div>

<h1 align="center"><a href="https://github.com/Lete114/Prefetch-Page" target="_blank">Prefetch-Page</a></h1>
<p align="center">浏览器在空闲时预加载可见区域的超链接，以加速后续页面的加载速度</p>

<p align="center">
    <a href="https://github.com/Lete114/Prefetch-Page/releases/"><img src="https://img.shields.io/npm/v/prefetch-page?logo=npm" alt="Version"></a>
    <a href="https://github.com/Lete114/Prefetch-Page/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/prefetch-page?color=FF5531" alt="MIT License"></a>
</p>

## 安装

使用 npm:

```bash
npm install prefetch-page --save
```

使用 CDN:

需要调用`prefetch()`触发

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
```

## 使用方法

在浏览器中使用

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    prefetch({ threshold: 25, delay: 3000, limit: 10 })
  })
</script>
```

ESModule 模块

```js
import prefetch from 'prefetch-page'

addEventListener('load', function () {
  prefetch({ threshold: 25, delay: 3000, limit: 10 })
})
```

CommonJS 模块

```js
const prefetch = require('prefetch-page')

addEventListener('load', function () {
  prefetch({ threshold: 25, delay: 3000, limit: 10 })
})
```

## 选项 API

### prefetch(options)

返回类型: `Function`

返回一个函数，执行这个函数会停止观察所有未预加载的`<a>`标签超链接

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    const clear = prefetch()
    clear()
  })
</script>
```

### options.el

类型: `String|Element`

默认值: `document`

监听指定 DOM 元素下的超链接

```html
<div id="box">
  <a href="test1.html">test page 1</a>
  <a href="test2.html">test page 2</a>
  <a href="test3.html">test page 3</a>
</div>
<a href="test4.html">test page 4</a>
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    // 只会对 test1.html test2.html test3.html 的超链接进行监听预加载
    prefetch({ el: '#box' })
    // or
    prefetch({ el: document.getElementById('box') })
  })
</script>
```

### options.origins

类型: `Array`

默认值: `[location.hostname]`

只对指定的 origin 进行预加载，星号(\*)允许所有源预加载

```html
<a href="https://example.com/test1.html">test page 1</a>
<a href="https://www.example.com/test2.html">test page 2</a>
<a href="https://blog.example.com/test3.html">test page 3</a>
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    // 只会对 test1.html test3.html 的超链接进行监听预加载
    prefetch({ origins: ['example.com', 'blog.example.com'] })
    // 允许所有源
    prefetch({ origins: '*' })
  })
</script>
```

### options.limit

类型: `Number`

默认值: `Infinity`

限制预加载总数

```html
<a href="test1.html">test page 1</a>
<a href="test2.html">test page 2</a>
<a href="test3.html">test page 3</a>
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    // 假设 test1.html 在浏览器窗口可视区域，并且已经预加载
    // 如果再次滚动浏览器窗口可视区域到 test2.html 显示区域时，则不再预加载任何超链接，已超出限制
    prefetch({ limit: 1 })
  })
</script>
```

### options.threshold

类型: `Number`

默认值: `0`

当目标超链接出现在浏览器可视区域大于等于 25% 时触发预加载

### options.delay

类型: `Number`

默认值: `0`

当目标超链接出现在浏览器可视区域时延迟 3 秒触发预加载

如果未到 3 秒，假设在延迟到 2 秒的时候滚动到其它位置，导致目标超链接不再可视范围时，则终止触发预加载函数

如果目标元素再次出现唉可视区域，则重新延迟 3 秒

### options.customs

类型: `Array`

默认值: `undefined`

自定义预加载资源，可以是 img、mp3、mp4、json 任何资源

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    prefetch({ customs: ['markdown.js', '404.html', 'https://www.example.com'] })
  })
</script>
```

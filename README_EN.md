<div align="right">
  Language:
  English
  <a title="中文" href="/README.md">中文</a>
</div>

<h1 align="center"><a href="https://github.com/Lete114/Prefetch-Page" target="_blank">Prefetch-Page</a></h1>
<p align="center">Browser prefetchs visible area hyperlinks at idle time to speed up subsequent page loads</p>

<p align="center">
    <a href="https://github.com/Lete114/Prefetch-Page/releases/"><img src="https://img.shields.io/npm/v/prefetch-page?logo=npm" alt="Version"></a>
    <a href="https://github.com/Lete114/Prefetch-Page/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Lete114/Prefetch-Page?color=FF5531" alt="MIT License"></a>
</p>

## Installing

Using npm:

```bash
npm install prefetch-page --save
```

Using CDN:

Need to call `prefetch()` to trigger

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
```

Execute immediately, built in 'addEventListener('load', function () {})' so it doesn't block the page

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page/dist/prefetch.attr.js"></script>
```

## Using

Use in your browser

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    prefetch({ threshold: 25, delay: 3000, limit: 10 })
  })
</script>
```

Option values can be set on the `<script>` tag

> Note: origins and customs attributes need to be comma-separated (and only `prefetch.attr.js` can set attributes on tags)

```html
<script
  src="https://cdn.jsdelivr.net/npm/prefetch-page/dist/prefetch.attr.js"
  limit="10"
  delay="3000"
  threshold="25"
  origins="example.com,blog.example.com"
  customs="markdown.js,404.html,https://www.example.com"
></script>
```

ESModule Modules

```js
import prefetch from 'prefetch-page'

addEventListener('load', function () {
  prefetch({ threshold: 25, delay: 3000, limit: 10 })
})
```

CommonJS Modules

```js
const prefetch = require('prefetch-page')

addEventListener('load', function () {
  prefetch({ threshold: 25, delay: 3000, limit: 10 })
})
```

## Options API

### prefetch(options)

ReturnType: `Function`

Returns a function executing this function will stop watching all the `<a>` tag hyperlinks that are not prefetched

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

Type: `String|Element`

Default: `document`

Listens for hyperlinks under a given DOM element

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
    // Only the hyperlinks to test1.html test2.html test3.html will be listened to for prefetching
    prefetch({ el: '#box' })
    // or
    prefetch({ el: document.getElementById('box') })
  })
</script>
```

### options.origins

Type: `Array`

Default: `[location.hostname]`

Prefetch only the specified origins, Asterisk (\*) allows all origins to be prefetched

```html
<a href="https://example.com/test1.html">test page 1</a>
<a href="https://www.example.com/test2.html">test page 2</a>
<a href="https://blog.example.com/test3.html">test page 3</a>
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    // Only the test1.html test3.html hyperlink will be listened to prefetch
    prefetch({ origins: ['example.com', 'blog.example.com'] })
    // allows all origins
    prefetch({ origins: '*' })
  })
</script>
```

### options.limit

Type: `Number`

Default: `Infinity`

Limit the total number of prefetch

```html
<a href="test1.html">test page 1</a>
<a href="test2.html">test page 2</a>
<a href="test3.html">test page 3</a>
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    // Assuming that test1.html is in the visible area of the browser window and has been prefetch
    // If you scroll the visible area of the browser window to the test2.html display area again, no more hyperlinks are preloaded and the limit is exceeded
    prefetch({ limit: 1 })
  })
</script>
```

### options.threshold

Type: `Number`

Default: `0`

Preload is triggered when the target hyperlink appears in more than 25% of the browser's viewable area

### options.delay

Type: `Number`

Default: `0`

Delay 3 seconds to trigger the preload when the target hyperlink appears in the viewable area of the browser

If the delay is less than 3 seconds, the preload function is terminated if the target hyperlink is no longer visible, assuming that it scrolls to another location when the delay reaches 2 seconds

If the target element reappears in the visible area, the preload is delayed for 3 seconds again

### options.customs

Type: `Array`

Default: `undefined`

Custom preloaded resources, can be img, mp3, mp4, json any resource

```html
<script src="https://cdn.jsdelivr.net/npm/prefetch-page"></script>
<script>
  addEventListener('load', function () {
    prefetch({ customs: ['markdown.js', '404.html', 'https://www.example.com'] })
  })
</script>
```

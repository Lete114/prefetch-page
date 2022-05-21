const { hostname, href } = location

// Store the prefetched url
let isFetch = []

/**
 * Create a prefetched link tag to insert into the head
 * @param {String} href Prefetched url
 */
function createLink(href) {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}

/**
 * Perform prefetching
 * @param {String} url Prefetched url
 */
function prefetch(url) {
  const nav = navigator
  const { saveData, effectiveType } = nav.connection || nav.mozConnection || nav.webkitConnection || {}
  // If 2G is used or the save-data function is enabled, prefetch is not performed
  if (saveData || /2g/.test(effectiveType)) return
  // Preventing duplicate prefetching
  if (!isFetch.includes(url)) {
    isFetch.push(url)
    createLink(url)
  }
}

/**
 * Whether to support prefetch and IntersectionObserver
 * @returns {Boolean}
 */
function isSupports() {
  const link = document.createElement('link')
  return link.relList && link.relList.supports && link.relList.supports('prefetch') && IntersectionObserver
}

/**
 * https://github.com/Lete114/prefetch-page
 * Example:
 *   prefetch({ el: '#box' })    // Select all a tag links under the box tag whose id attribute is
 *   prefetch({ el: document.body })
 *   prefetch({ origins: '*' })  // Allows all origins to be prefetched
 *   prefetch({ origins: ['example.com', 'www.example.com', 'blog.example.com'] })
 *   prefetch({ limit: 10 })
 *   prefetch({ threshold: 25 }) // Trigger prefetching after entering 25% of the visible area
 *   prefetch({ delay: 1000 })   // Prefetch is triggered after staying in the visible area for 1 second
 *   prefetch({ customs: ['markdown.js', '404.html', 'https://www.example.com'] })
 * @param {String|Element} [options.el]         - All a tag links under the specified selector (default whole page)
 * @param {Array}          [options.origins]    - Allowed origins to prefetch, Asterisk (*) allows all origins to be prefetched (default [location.hostname])
 * @param {Number}         [options.limit]      - The total number of prefetches to allow (default unlimited)
 * @param {Number}         [options.threshold]  - Percentage of access to the visible area (default 1 pixel appears in the visible area is prefetched)
 * @param {Number}         [options.delay]      - Time each link needs to stay inside viewport before prefetching (milliseconds) (default no delay)
 * @param {Array}          [options.customs]    - Custom prefetch resource (default [])
 * @returns {Function}                          - Executing this function will stop watching all the `<a>` tag hyperlinks that are not prefetched
 */
export default (options) => {
  if (!isSupports()) return
  if (!options) options = {}
  const el = document.querySelector(options.el) || options.el || document
  const origins = options.origins || [hostname]
  const limit = options.limit || 1 / 0
  const threshold = (options.threshold || 0) / 100
  const delay = options.delay || 0
  const customs = options.customs || []

  const observer = new IntersectionObserver(observerCallback, { threshold })

  function setDelay(callback, delay) {
    if (!delay) return callback()
    return setTimeout(callback, delay)
  }

  function observerCallback(entries) {
    entries.forEach(({ isIntersecting, target }) => {
      // Delayed prefetching
      function delayFn() {
        observer.unobserve(target) // Stop watching
        if (isFetch.length < limit) prefetch(target.href)
      }

      // Whether the currently observed target appears in the visible window area
      // Clear the delay if you leave the visible window during the delay time
      if (isIntersecting) target.prefetch = setDelay(delayFn, delay)
      else clearTimeout(target.prefetch)
    })
  }

  el.querySelectorAll('a:not([target=_blank])').forEach((node) => {
    // If no origins are set, then all origins are prefetch
    // and vice versa only prefetch the set origins
    if (origins === '*' || origins.includes(node.hostname)) {
      // Avoid watching the current page
      if (node.href === href) return
      // Filtering hash, Avoid unnecessary observations
      const { origin, pathname } = new URL(node.href, href)
      origin + pathname === node.href ? observer.observe(node) : ''
    }
  })
  // custom prefetch
  for (let i = 0; i < customs.length; i++) prefetch(customs[i])

  return function () {
    isFetch = []
    observer.disconnect()
  }
}

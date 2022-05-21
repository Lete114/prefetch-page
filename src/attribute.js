// Get property parameters
const { hostname, href } = location
const attr = document.currentScript
const el = document.querySelector(attr.getAttribute('el')) || document
let origins = attr.getAttribute('origins')
origins = origins ? origins.split(',').map((i) => i.trim()) : [hostname]
const limit = attr.getAttribute('limit') || 1 / 0
const threshold = attr.getAttribute('threshold') / 100
const delay = attr.getAttribute('delay') || 0
let customs = attr.getAttribute('customs')
customs = customs ? customs.split(',') : []

// Store the prefetched url
const isFetch = []

/**
 * Whether to support prefetch and IntersectionObserver
 * @returns {Boolean}
 */
function isSupports() {
  const link = document.createElement('link')
  return link.relList && link.relList.supports && link.relList.supports('prefetch') && IntersectionObserver
}

/**
 * Create a prefetched link tag to insert into the head
 * @param {String} href Prefetched url
 */
function createPrefetch(href) {
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
    createPrefetch(url)
  }
}

// Wait for all resources on the page to be loaded and then execute
addEventListener('load', () => {
  if (!isSupports()) return
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
    if (origins[0] === '*' || origins.includes(node.hostname)) {
      // Avoid watching the current page
      if (node.href === href) return
      // Filtering hash, Avoid unnecessary observations
      const { origin, pathname } = new URL(node.href, href)
      origin + pathname === node.href ? observer.observe(node) : ''
    }
  })
  // custom prefetch
  for (let i = 0; i < customs.length; i++) prefetch(customs[i].trim())
})

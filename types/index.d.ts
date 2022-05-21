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
export default function prefetch(options?: Object): Function;

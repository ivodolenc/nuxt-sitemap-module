/**
 * Robots rules.
 *
 * @since 1.0.0
 */
export interface RobotsRules {
  /**
   * Specifies the user agent name.
   */
  'User-agent'?: string | string[]
  /**
   * Specifies the crawl delay.
   */
  'Crawl-delay'?: number | number[]
  /**
   * Specifies paths that may be crawled by the user agent.
   */
  Allow?: string | string[]
  /**
   * Specifies paths that won't be crawled by the user agent.
   */
  Disallow?: string | string[]
  /**
   * Specifies preferred domain.
   */
  Host?: string | string[]
}

/**
 * Robots options.
 *
 * @since 1.0.0
 */
export interface RobotsOptions {
  /**
   * Defines the `robots` file name.
   *
   * Usually you won't need to change this.
   *
   * @default 'robots.txt'
   */
  fileName?: string
  /**
   * An array of objects that define `robots` rules.
   *
   * Each object is treated as a separate block of rules.
   *
   * @example
   *
   * ```js
   * {
   *   rules: [
   *     {
   *       'User-agent': '*',
   *       Disallow: ''
   *     }
   *   ]
   * }
   * ```
   *
   * @default []
   */
  rules?: RobotsRules[]
  /**
   * An array of strings that define `robots` sitemaps.
   *
   * Each string is treated as a new url.
   *
   * To completely disable the `sitemaps` option, set it to `false`.
   *
   * @example
   *
   * ```js
   * {
   *   Sitemaps: ['sitemap.xml']
   * }
   * ```
   *
   * @default ['<site-url>/sitemap.xml']
   */
  sitemaps?: string[] | false
}

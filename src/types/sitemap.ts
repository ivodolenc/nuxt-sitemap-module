import type { ChangefreqValue } from './index'

/**
 * Sitemap route options.
 *
 * @since 1.0.0
 */
export interface RouteOptions {
  /**
   * Defines the route slug.
   */
  url?: string
  /**
   * Defines the last date when the specified page was modified.
   *
   * It uses the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ssTZD`.
   */
  lastmod?: string | false
  /**
   * Defines how frequently the page is likely to change.
   */
  changefreq?: ChangefreqValue
  /**
   * Defines the page priority.
   *
   * It uses numbers from `0.0` to `1.0`.
   */
  priority?: string | false
}

import type { NuxtPage } from '@nuxt/schema'
import type { RobotsOptions, RouteOptions } from './index'

export type ChangefreqValue =
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'always'
  | 'never'
  | false

/**
 * Module options.
 *
 * @since 1.0.0
 */
export interface ModuleOptions {
  /**
   * Defines the site URL for `production`.
   *
   * This is necessary since Nuxt can't automatically detect the site URL during `SSG`.
   *
   * In `development` mode it is set to `nuxt.options.devServer.url`.
   *
   * In `build` mode it is set to `nuxt.options.app.baseURL`.
   *
   * @example
   *
   * ```js
   * {
   *   siteUrl: 'https://www.website.com'
   * }
   * ```
   *
   * @default 'http://localhost:3000'
   */
  siteUrl?: string
  /**
   * Defines the `sitemap` file name.
   *
   * Usually you won't need to change this.
   *
   * @default 'sitemap.xml'
   */
  fileName?: string
  /**
   * Defines the last date when the specified page was modified.
   *
   * It uses the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ssTZD`.
   *
   * To completely disable the `lastmod` option, set it to `false`.
   *
   * @example
   *
   * ```js
   * {
   *   lastmod: new Date().toISOString()
   * }
   * ```
   *
   * @default undefined
   */
  lastmod?: string | false
  /**
   * Defines how frequently the page is likely to change.
   *
   * To completely disable the `changefreq` option, set it to `false`.
   *
   * @default 'daily'
   */
  changefreq?: ChangefreqValue
  /**
   * Defines the page priority.
   *
   * It uses numbers from `0.0` to `1.0`.
   *
   * To completely disable the `priority` option, set it to `false`.
   *
   * @default '0.7'
   */
  priority?: string | false
  /**
   * Excludes specific pages from the sitemap.
   *
   * Dynamic routes are excluded by default so you don't have to worry about that.
   *
   * Filtering is done by `micromatch` under the hood, so wildcards `**, *` are also supported.
   *
   * @see [Matching features](https://github.com/micromatch/micromatch#matching-features)
   *
   * @example
   *
   * ```js
   * {
   *   exclude: ['/', '/about/*']
   * }
   * ```
   *
   * @default []
   */
  exclude?: string[]
  /**
   * An array of objects that allows customization for each route separately.
   *
   * Filtering is done by `url` property, which is basically a `/route-slug`.
   *
   * @example
   *
   * ```js
   * {
   *   routes: [
   *     {
   *       url: '/', // Index page
   *       lastmod: '2022-09-03',
   *       changefreq: 'daily',
   *       priority: 1.0
   *     },
   *     {
   *       url: '/about', // About page
   *       lastmod: '2022-10-18',
   *       changefreq: 'weekly',
   *       priority: 0.6
   *     },
   *     // ...
   *   ]
   * }
   * ```
   *
   * @default []
   */
  routes?: RouteOptions[]
  /**
   * Specifies options for the `robots.txt` file.
   *
   * To completely disable the `robots` option, set it to `false`.
   *
   * @default RobotsOptions
   */
  robots?: RobotsOptions | false
}

/**
 * Module default options.
 *
 * @since 1.0.0
 */
export interface ModuleDefaults extends ModuleOptions {
  /**
   * Automatically specifies path to the Nuxt `build` directory.
   *
   * The generated files will be placed directly in the `build` directory to avoid frequent content revisions by Git. This means there will be no changes or extra files to deal with in the `public/` directory which is awesome.
   *
   * @default '/<rootDir>/.nuxt/dist/client'
   */
  buildDir: string
  /**
   * Dynamically specifies the `current` site url.
   *
   * @default 'http://localhost:3000'
   */
  appUrl?: string
  /**
   * Gets a list of all Nuxt pages.
   *
   * @default []
   */
  pages: NuxtPage[]
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    /**
     * Nuxt Sitemap Module
     *
     * Lightweight and fast _Sitemap_ generator for Nuxt.
     *
     * @see [source](https://github.com/ivodolenc/nuxt-sitemap-module)
     */
    sitemap?: ModuleOptions
  }
  interface NuxtOptions {
    /**
     * Nuxt Sitemap Module
     *
     * Lightweight and fast _Sitemap_ generator for Nuxt.
     *
     * @see [source](https://github.com/ivodolenc/nuxt-sitemap-module)
     */
    sitemap?: ModuleOptions
  }
}

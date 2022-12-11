import { writeFileSync } from 'node:fs'
import micromatch from 'micromatch'
import type { ModuleDefaults, RouteOptions } from '../types'

/**
 * @since 1.0.0
 */
const parseRoutes = (options: ModuleDefaults) => {
  const { pages, lastmod, changefreq, priority, exclude, routes } = options

  const customRoutes = routes
  const parsedRoutes: RouteOptions[] = []
  let filteredPages: string[] = []

  for (const page of pages) {
    if (!(page.path.includes(':') || page.path.includes('*'))) {
      filteredPages.push(page.path)

      if (page.children?.length) {
        for (const childPage of page.children)
          filteredPages.push(childPage.path)
      }
    }
  }

  if (exclude && exclude.length)
    filteredPages = micromatch.not(filteredPages, exclude)

  for (const route of filteredPages) {
    const routeOptions: RouteOptions = {
      url: route,
      lastmod,
      changefreq,
      priority
    }

    if (customRoutes && customRoutes.length) {
      const routeFilter = customRoutes.filter(
        route => route.url === routeOptions.url
      )
      const routeCustomOptions = Object.assign(
        routeOptions,
        ...routeFilter.flat()
      )

      parsedRoutes.push(routeCustomOptions)
    } else {
      parsedRoutes.push(routeOptions)
    }
  }

  return parsedRoutes.slice().reverse()
}

/**
 * @since 1.0.0
 */
const generateContent = (options: ModuleDefaults) => {
  const xmlTag = `<?xml version="1.0" encoding="UTF-8"?>\n`
  const urlsetOpenTag = `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n`
  const urlsetCloseTag = `</urlset>`
  const urlOpenTag = `<url>\n`
  const urlCloseTag = `</url>\n`
  let urls = ''

  const parsedRoutes = parseRoutes(options)

  for (const route of parsedRoutes) {
    const locTag = `<loc>${route.url}</loc>\n`

    const lastmodTag = route.lastmod
      ? `<lastmod>${route.lastmod}</lastmod>\n`
      : ''
    const changefreqTag = route.changefreq
      ? `<changefreq>${route.changefreq}</changefreq>\n`
      : ''
    const priorityTag = route.priority
      ? `<priority>${route.priority}</priority>\n`
      : ''

    urls += `${urlOpenTag}${locTag}${lastmodTag}${changefreqTag}${priorityTag}${urlCloseTag}`
  }

  urls.replace(/^\s*[\r\n]/gm, '')
  const content = `${xmlTag}${urlsetOpenTag}${urls}${urlsetCloseTag}`

  return content
}

/**
 * @since 1.0.0
 */
export const generateSitemap = (options: ModuleDefaults) => {
  const { fileName, publicDir } = options

  const sitemapFile = `${publicDir}/${fileName}`
  const sitemapContent = generateContent(options)

  return writeFileSync(sitemapFile, sitemapContent)
}

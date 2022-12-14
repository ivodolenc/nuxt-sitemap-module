import { defineNuxtModule } from '@nuxt/kit'
import { generateSitemap, generateRobots } from './utils'
import type { ModuleOptions, ModuleDefaults } from './types'

export * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-sitemap-module',
    configKey: 'sitemap',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },

  defaults: {
    fileName: 'sitemap.xml',
    changefreq: 'daily',
    priority: '0.7',
    exclude: [],
    routes: [],
    robots: {
      fileName: 'robots.txt',
      rules: [],
      sitemaps: []
    }
  },

  setup(moduleOptions, nuxt) {
    const buildDir = `${nuxt.options.buildDir}/dist/client`
    let appUrl: string | undefined = nuxt.options.devServer.url

    if (nuxt.options._build) appUrl = nuxt.options.app.baseURL
    if (nuxt.options._generate) appUrl = moduleOptions.siteUrl

    const options: ModuleDefaults = {
      buildDir,
      appUrl,
      pages: [],
      ...moduleOptions
    }

    nuxt.hooks.hookOnce('pages:extend', nuxtPages => {
      options.pages = [...nuxtPages]
    })

    nuxt.hooks.hookOnce('nitro:build:before', () => {
      generateSitemap(options)
      if (options.robots) generateRobots(options)
    })
  }
})

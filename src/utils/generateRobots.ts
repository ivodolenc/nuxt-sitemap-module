import { writeFileSync } from 'node:fs'
import type { ModuleDefaults, RobotsOptions, RobotsRules } from '../types'

/**
 * @since 1.0.0
 */
const parseRules = (block: RobotsRules) => {
  let newRules = ''

  for (const [key, value] of Object.entries(block)) {
    if (!Array.isArray(value)) {
      newRules += `${key}: ${value}\n`
    } else {
      for (const _value of value) {
        newRules += `${key}: ${_value}\n`
      }
    }
  }

  return `${newRules}\n`
}

/**
 * @since 1.0.0
 */
const parseSitemaps = (sitemaps: string[], appUrl?: string) => {
  let newSitemaps = ''

  for (const sitemap of sitemaps)
    newSitemaps += `Sitemap: ${appUrl}/${sitemap}\n`

  return newSitemaps
}

/**
 * @since 1.0.0
 */
const generateContent = (
  rules: RobotsRules[],
  sitemaps?: string[] | false,
  appUrl?: string
) => {
  let robotsContent = ''
  let rulesContent = ''

  for (const block of rules) rulesContent += parseRules(block)

  robotsContent += rulesContent

  if (sitemaps && sitemaps.length)
    robotsContent += parseSitemaps(sitemaps, appUrl)

  return robotsContent.trim()
}

/**
 * @since 1.0.0
 */
export const generateRobots = (options: ModuleDefaults) => {
  const { buildDir, appUrl } = options

  const robots = options.robots as RobotsOptions
  const rules = robots.rules as RobotsRules[]
  const { fileName, sitemaps } = robots

  const defaultRules = {
    'User-agent': '*',
    Disallow: ''
  }

  if (!rules.length) rules.push(defaultRules)
  if (sitemaps && !sitemaps.length) sitemaps.push('sitemap.xml')

  const robotsFile = `${buildDir}/${fileName}`
  const robotsContent = generateContent(rules, sitemaps, appUrl)

  return writeFileSync(robotsFile, robotsContent)
}

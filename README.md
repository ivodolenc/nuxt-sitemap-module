# Nuxt Sitemap Module

Lightweight and fast _Sitemap_ generator for Nuxt.

## Features

- Generates `sitemap.xml` and `robots.txt` files
- Allows advanced customization
- Designed for Nuxt 3+
- TypeScript friendly
- Super easy to use
- No dependencies

## Quick Start

1. Install `nuxt-sitemap-module` to your project

```sh
npm i -D nuxt-sitemap-module
```

2. Enable the module in the main config file

```js
// nuxt.config.ts

{
  modules: ['nuxt-sitemap-module'],

  sitemap: {
    siteUrl: 'https://www.website.com' // Set your website url
  }
}
```

That's it! Start developing your app!

## Options

The module is written in TypeScript so it improves the development experience with detailed descriptions, examples, and auto-hinted configuration right in the code editor.

### Defaults

```js
// nuxt.config.ts

{
  sitemap: {
    siteUrl: 'http://localhost:3000',
    fileName: 'sitemap.xml',
    lastmod: undefined,
    changefreq: 'daily',
    priority: '0.7',
    exclude: [],
    routes: [],
    robots: {
      fileName: 'robots.txt',
      rules: [
        {
          'User-agent': '*',
          Disallow: ''
        }
      ],
      sitemaps: ['<site-url>/sitemap.xml']
    }
  }
}
```

### siteUrl

- Type: `string`
- Default: `http://localhost:3000`

Defines the site URL for `production`.

This is necessary since Nuxt can't automatically detect the site URL during `SSG`.

In `build` mode it is set to `nuxt.options.app.baseURL`.

In `development` mode it is set to `nuxt.options.devServer.url`.

```js
{
  siteUrl: 'https://www.website.com'
}
```

### fileName

- Type: `string`
- Default: `sitemap.xml`

Defines the `sitemap` file name.

Usually you won't need to change this.

```js
{
  fileName: 'sitemap.xml'
}
```

### lastmod

- Type: `string | false`
- Default: `undefined`

Defines the last date when the specified page was modified.

It uses the format `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ssTZD`.

To completely disable the `lastmod` option, set it to `false`.

```js
{
  lastmod: new Date().toISOString()
}
```

### changefreq

- Type: `string | false`
- Default: `daily`

Defines how frequently the page is likely to change.

To completely disable the `changefreq` option, set it to `false`.

```js
{
  changefreq: 'weekly'
}
```

### priority

- Type: `string | false`
- Default: `0.7`

Defines the page priority.

It uses numbers from `0.0` to `1.0`.

To completely disable the `priority` option, set it to `false`.

```js
{
  priority: '1.0'
}
```

### exclude

- Type: `string[]`
- Default: `[]`

Excludes specific pages from the sitemap.

Dynamic routes are excluded by default so you don't have to worry about that.

Filtering is done by `micromatch` under the hood, so wildcards `**, *` are also supported.

[Matching features](https://github.com/micromatch/micromatch#matching-features)

```js
{
  exclude: ['/', '/about/*']
}
```

### routes

- Type: `object[]`
- Default: `[]`

An array of objects that allows customization for each route separately.

Filtering is done by `url` property, which is basically a `/route-slug`.

```js
{
  routes: [
    {
      url: '/', // Index page
      lastmod: '2022-09-03',
      changefreq: 'daily',
      priority: 1.0
    },
    {
      url: '/about', // About page
      lastmod: '2022-10-18',
      changefreq: 'weekly',
      priority: 0.6
    }
    // ...
  ]
}
```

### robots

- Type: `object`
- Default: `{ ... }`

Specifies options for the `robots.txt` file.

To completely disable the `robots` option, set it to `false`.

### robots.fileName

- Type: `string`
- Default: `robots.txt`

Defines the `robots` file name.

Usually you won't need to change this.

```js
{
  robots: {
    fileName: 'robots.txt'
  }
}
```

### robots.rules

- Type: `object[]`
- Default: `[{ ... }]`

An array of objects that define `robots` rules.

Each object is treated as a separate block of rules.

```js
{
  robots: {
    rules: [
      {
        'User-agent': '*',
        Disallow: ''
      }
    ]
  }
}
```

### robots.sitemaps

- Type: `string[]`
- Default: `['<site-url>/sitemap.xml']`

An array of strings that define `robots` sitemaps.

Each string is treated as a new url.

To completely disable the `sitemaps` option, set it to `false`.

```js
{
  robots: {
    sitemaps: ['sitemap.xml', 'sitemap-2.xml']
  }
}
```

## Show Support

This is a free and open source project available to everyone. If you like it, `leave a star` to show your support.

### Starring a repository

Navigate to the top-right corner of the page and click the <kbd>☆ Star</kbd> button.

## License

### Nuxt Sitemap Module

[MIT License](LICENSE)

Copyright © Ivo Dolenc

Developed in Croatia 🇭🇷

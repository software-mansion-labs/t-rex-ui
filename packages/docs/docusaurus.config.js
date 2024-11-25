// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('./src/theme/CodeBlock/highlighting-light.js');
const darkCodeTheme = require('./src/theme/CodeBlock/highlighting-dark.js');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 't-rex-ui',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  url: 'https://docs.swmansion.com',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'software-mansion-labs', // Usually your GitHub org/user name.
  projectName: 't-rex-ui', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false,
          editUrl:
            'https://github.com/software-mansion-labs/t-rex-ui/tree/main/packages/docs/docs',
          lastVersion: 'current', // <- this makes 3.x docs as default
          versions: {
            current: {
              label: '3.x',
            },
          },
        },
        blog: {
          showReadingTime: false,
          blogSidebarTitle: 'Examples',
        },
        theme: {
          customCss: require.resolve('./src/css/index.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 't-rex-ui',
        logo: {
          alt: 't-rex-ui',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: 'docs/fundamentals/lorem',
            activeBasePath: 'docs',
            label: 'Docs',
            position: 'left',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: 'https://github.com/software-mansion-labs/t-rex-ui/',
            position: 'right',
            className: 'header-github',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [],
        copyright:
          'All trademarks and copyrights belong to their respective owners.',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: 'CHLGM6BFRG',
        apiKey: 'b87befadf62b27ce46142fee664e9c9c',
        indexName: 'react-native-reanimated',
      },
    }),
};

module.exports = config;

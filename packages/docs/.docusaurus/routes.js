import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'ed2'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'b50'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'f89'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'd2f'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '6a3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'b9a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'b53'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '240'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '881'),
    exact: true
  },
  {
    path: '/blog/t-rex-ui',
    component: ComponentCreator('/blog/t-rex-ui', '121'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'b16'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'd14'),
    exact: true
  },
  {
    path: '/docs/1.x',
    component: ComponentCreator('/docs/1.x', '08a'),
    routes: [
      {
        path: '/docs/1.x/',
        component: ComponentCreator('/docs/1.x/', 'afc'),
        exact: true,
        sidebar: "version-1.x/docs"
      }
    ]
  },
  {
    path: '/docs/2.x',
    component: ComponentCreator('/docs/2.x', 'bc7'),
    routes: [
      {
        path: '/docs/2.x/lorem-ip',
        component: ComponentCreator('/docs/2.x/lorem-ip', '19f'),
        exact: true,
        sidebar: "docs"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '0e3'),
    routes: [
      {
        path: '/docs/category/fundamentals',
        component: ComponentCreator('/docs/category/fundamentals', 'e29'),
        exact: true,
        sidebar: "docsSidebar"
      },
      {
        path: '/docs/category/tutorial---extras',
        component: ComponentCreator('/docs/category/tutorial---extras', 'c43'),
        exact: true,
        sidebar: "docsSidebar"
      },
      {
        path: '/docs/fundamentals/lorem',
        component: ComponentCreator('/docs/fundamentals/lorem', 'd18'),
        exact: true,
        sidebar: "docsSidebar"
      },
      {
        path: '/docs/fundamentals/lorem-ipsum',
        component: ComponentCreator('/docs/fundamentals/lorem-ipsum', 'f5c'),
        exact: true,
        sidebar: "docsSidebar"
      },
      {
        path: '/docs/fundamentals/lorem-ipsum-dolor',
        component: ComponentCreator('/docs/fundamentals/lorem-ipsum-dolor', 'fb4'),
        exact: true,
        sidebar: "docsSidebar"
      },
      {
        path: '/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', '37f'),
        exact: true,
        sidebar: "docsSidebar"
      },
      {
        path: '/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docs/tutorial-extras/translate-your-site', '761'),
        exact: true,
        sidebar: "docsSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '413'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

![T-Rex UI header image](https://github.com/software-mansion-labs/t-rex-ui/assets/39658211/72a82b50-8411-4c9f-903b-4f37cba4afd1)

T-Rex UI is a React component library that contains reusable Docusaurus theme components. It aims to unify the components across SWM documentations.

## Installation

Install the package in your project directory with:

```bash
npm install @swmansion/t-rex-ui
```

## Setup

The recommended way to use T-Rex UI is via the **preset**, which automatically registers all theme components and the LLM plugin.

Add the preset to your `docusaurus.config.js` **after** the `classic` preset (order matters):

```js
presets: [
  [
    'classic',
    {
      // your classic preset options
    },
  ],
  require.resolve('@swmansion/t-rex-ui/preset'),
],
```

The preset accepts the following options:

```js
require.resolve('@swmansion/t-rex-ui/preset'),
// or, with options:
[require.resolve('@swmansion/t-rex-ui/preset'), { llms: false }],
```

| Option | Default | Description |
|--------|---------|-------------|
| `llms` | `true`  | Enables `@swmansion/docusaurus-plugin-llms`. Pass `false` to disable, or an object to forward options to the plugin. |

## Customization

The preset applies all T-Rex UI theme components automatically. However, some components require **site-specific props** and must still be swizzled manually in your project.

### Navbar

The T-Rex UI `Navbar` requires `heroImages` to display the logo on the landing page. Create `src/theme/Navbar/index.js`:

```js
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Navbar } from '@swmansion/t-rex-ui';

export default function NavbarWrapper(props) {
  const heroImages = {
    logo: useBaseUrl('/img/logo.svg'),
  };

  return <Navbar heroImages={heroImages} {...props} />;
}
```

### DocSidebar

The T-Rex UI `DocSidebar` requires `heroImages` for the sidebar logo/title and accepts optional arrays to badge sidebar items. Create `src/theme/DocSidebar/index.js`:

```js
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { DocSidebar } from '@swmansion/t-rex-ui';

export default function DocSidebarWrapper(props) {
  const heroImages = {
    logo: useBaseUrl('/img/logo.svg'),
    title: useBaseUrl('/img/logo.svg'),
  };

  // Optional: badge specific doc IDs in the sidebar
  const newItems = [];
  const experimentalItems = [];
  const deprecatedItems = [];
  const unreleasedItems = [];

  return (
    <DocSidebar
      newItems={newItems}
      experimentalItems={experimentalItems}
      deprecatedItems={deprecatedItems}
      unreleasedItems={unreleasedItems}
      heroImages={heroImages}
      {...props}
    />
  );
}
```

### TOCItems                                                                             
                                                                                         
The T-Rex UI `TOCItems` component renders the table of contents and by default shows a "H
ire us" banner at the bottom. Additionally you can insert your own banner with custom content using the `
slot` prop. Moreover you can modify "Hire us" banner's url using `hireUsUrl`. Create `src/theme/TOCItems/index.js`:                                        
                                                                                         
```js                                                                                    
import React from 'react';                                                               
import { TOCItems } from '@swmansion/t-rex-ui';                                          
                                                                                         
export default function TOCItemsWrapper(props) {                                         
  const slot = (                                                                         
    <div>                                                                                
      <p>Your custom banner content here.</p>                                            
    </div>                                                                               
  );                                                                                     
                                                                                         
  return <TOCItems slot={slot} {...props} />;                                            
}                                                                                        
```                                                              

### Platform circles in the table of contents

T-Rex UI can render small colored circles next to table of contents entries to indicate which platforms a given section (e.g. an API property) applies to. Add `[A]` (Android), `[I]` (iOS) and/or `[W]` (Web) markers at the end of a heading:

```md
### rippleColor [A]
```

The markers are stripped from the rendered heading — only the ToC entry gets the circles. To display platform badges next to the heading itself, wrap it in the `Badges` component.

Markers must be placed at the end of the heading, after any inline formatting. Only `.mdx` documents are supported (the circles are injected as MDX JSX nodes), and they are shown in the desktop ToC only, not in the mobile "On this page" dropdown.

Enable it by wiring the two remark plugins into the docs options in `docusaurus.config.js`:

```js
const platformCircles = require('@swmansion/t-rex-ui/platform-circles');

// in the classic preset options:
docs: {
  beforeDefaultRemarkPlugins: [platformCircles.processHeaderMarkers],
  remarkPlugins: [platformCircles.removeHeaderJSX],
},
```

The circles are rendered in the gutter to the left of the ToC entry, so entries without circles keep the same text alignment.

If the site defines the platform badge colors (`--swm-platform-badge-{android,ios,web}-background`), the circles use them automatically, so they stay consistent with the `Badges` component. The exception is the iOS circle in the dark theme, which defaults to `#ffffff` regardless of the badge color — a dark badge pill stays readable on a dark background, a dark circle does not. The colors can also be overridden independently of the badges with dedicated CSS variables:

```css
:root {
  --swm-platform-indicator-android-background: #34a853;
  --swm-platform-indicator-ios-background: #000000;
  --swm-platform-indicator-web-background: #1067c4;
}
```

The values above are also the built-in fallbacks used when neither the badge nor the indicator variables are defined.

### TopbarBanner

The T-Rex UI `TopbarBanner` renders a Adserver top bar above the navbar. It reserves its height **before hydration** (no content shift on reload) and serves content **server-side** — banners are swapped/rotated on the adserver with no redeploy. The component is shared; each site declares only its own zones (a small config object).

**1. Declare your zones.** Create `src/components/topbarBanner.config.ts`. The zone/content ids, colors and `hiddenPaths` are per site (zone ids encode the lib name):

```ts
import type { BannerZone } from '@swmansion/t-rex-ui';

export const TOPBAR_BANNER = {
  rotateIntervalMs: 4000,
  hiddenPaths: ['/your-lib/docs'] as string[],
  zones: [
    { zoneId: 'your-lib-topbar-1', contentId: 'YOUR_CONTENT_ID', fallbackBgColor: '#782aeb' },
    { zoneId: 'your-lib-topbar-2', contentId: 'YOUR_CONTENT_ID', fallbackBgColor: '#782aeb' },
  ] satisfies BannerZone[],
};
```

**2. Reserve height before paint.** In `docusaurus.config.js`, emit the inline reservation script via `headTags` (it runs in the static `<head>` before the body paints):

```js
// Import from the `/topbar-banner` subpath (React-free) — NOT the package root.
import { topbarBannerReservationScript } from '@swmansion/t-rex-ui/topbar-banner';
// @ts-expect-error -- .ts extension is intentional; not type-checked by tsc here.
import { TOPBAR_BANNER } from './src/components/topbarBanner.config.ts';

const firstZone = TOPBAR_BANNER.zones[0];
const bannerReservationHeadTags = firstZone
  ? [
      {
        tagName: 'script',
        attributes: { type: 'text/javascript' },
        innerHTML: topbarBannerReservationScript(
          firstZone.zoneId,
          firstZone.contentId,
          TOPBAR_BANNER.hiddenPaths
        ),
      },
    ]
  : [];

// inside the config object:
//   headTags: bannerReservationHeadTags,
```

**3. Render it above the navbar.** In the swizzled `src/theme/Navbar/index.jsx`, render `<TopbarBanner>` as a sibling above the navbar:

```jsx
import React from 'react';
import { useLocation } from '@docusaurus/router';
import { Navbar, TopbarBanner, isBannerHidden } from '@swmansion/t-rex-ui';
import { TOPBAR_BANNER } from '@site/src/components/topbarBanner.config';

export default function NavbarWrapper(props) {
  const location = useLocation();
  const bannerHidden = isBannerHidden(location.pathname, TOPBAR_BANNER.hiddenPaths);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {!bannerHidden && (
        <TopbarBanner
          zones={TOPBAR_BANNER.zones}
          rotateIntervalMs={TOPBAR_BANNER.rotateIntervalMs}
        />
      )}
      <Navbar {...props} />
    </div>
  );
}
```

No active content on the ad server = the bar stays collapsed (height 0). Single zone never rotates; pass multiple zones to slide between them on `rotateIntervalMs`.

### Other components

All other T-Rex UI components are applied automatically by the preset and require no additional setup. If you need to further customize any component, follow the standard [Docusaurus swizzling](https://docusaurus.io/docs/swizzling) approach - import the component from `@swmansion/t-rex-ui` and wrap or override it as needed.

## Example app

To make it easier to implement and test new features, we've provided example documentation. The documentation instantly reflects changes made to the library. To get started:

1. Run `yarn`
2. In `/packages/t-rex-ui` run `yarn watch`
3. In `/packages/docs` run `yarn start`
4. When changes are made do `t-rex-ui` docs should rebuild.

## Known issues

Sometimes when you "swizzle" a Docusaurus component, it may not recognize the changes and instead use a cached old version of the component rather than the one from the package.

If have used some component from `@swmansion/t-rex-ui` and doesn't see any changes, please rebuild your project using:

```sh
yarn build
```

## Available Theme Components

T-Rex UI provides the following SWM-themed Docusaurus components:

- `Admonition`
- `Badges`
- `ColorModeToggle`
- `DocCard`
- `DocSidebar`
- `DocSidebarItem`
- `DocSidebarItems`
- `DocItem`
  - `TOC/Mobile`
  - `TOC/Metadata`
  - `Layout` (see **LLM Button** section below)
- `DocVersionBanner`
- `Footer`
- `HireUsPage`
- `Logo`
- `Navbar`
- `MDXComponents`
- `PaginatorNavLink`
- `SearchPage`
- `ThemedImage`
- `TOCCollapsible`
- `TOCItems`
- `TOCItemTree`
- `TopbarBanner`


## Example docs and testing

To run the T-Rex UI example documentation and test components live, follow these steps:

In the `/packages/t-rex-ui directory`, run:

```sh
yarn watch
```

In the `/packages/docs directory`, run:

```sh
yarn start
```

When changes are made, the T-Rex UI documentation should automatically rebuild.

---

## Using DocSearch

Since Docusaurus v3.9.2, Algolia DocSearch v4 is supported with new AI-based features, including Ask AI. To enable Ask AI in your docs, follow [official instructions](https://docsearch.algolia.com/docs/v4/askai/) and add to your `docusaurus.config.js` config file:

```js
({
    ...
    algolia: {
        appId: 'YOUR_ALGOLIA_APP_ID',
        apiKey: 'YOUR_ALGOLIA_API_KEY',
        indexName: 'YOUR_ALGOLIA_INDEX_NAME',
        askAi: {
            assistantId: 'YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID',
            indexName: 'YOUR_ALGOLIA_INDEX_NAME',
            apiKey: 'YOUR_ALGOLIA_API_KEY',
            appId: 'YOUR_ALGOLIA_APP_ID',
        },
    },
}),
customFields: {
    algolia: {
        suggestedQuestions: true, # display suggested questions
        enableSidePanel: true, # enable floating widget and chat in sidepanel
    },
},
```

## LLM Button

T-Rex UI provides an optional **LLM Button** integrated into the `DocItem/Layout` component.

This button allows users to:

- Ask ChatGPT about the current page
- Ask Claude about the current page
- Copy the current page as Markdown


### Enabling the LLM Button

The `DocItem/Layout` component (which embeds the LLM Button) is applied automatically when using the preset. No additional swizzling is required.

---

## Docusaurus Plugin: LLM Support

T-Rex UI provides a dedicated Docusaurus plugin:

`docusaurus-plugin-llms`

This plugin is required for the **LLM Button** to work properly.

### What the Plugin Does

During the build process, the plugin:

1. **Generates `llms.txt`**
2. **Generates `llms-full.txt`**
3. **Converts `.mdx` files to `.md`**

### Setup

The plugin is **included automatically** when using the T-Rex UI preset. No extra configuration is needed.

If you want to disable it, pass `llms: false` to the preset options:

```js
[require.resolve('@swmansion/t-rex-ui/preset'), { llms: false }],
```

As of current moment, there is no possibility to use this plugin on its own.

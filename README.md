![T-Rex UI header image](https://github.com/software-mansion-labs/t-rex-ui/assets/39658211/72a82b50-8411-4c9f-903b-4f37cba4afd1)

T-Rex UI is a React component library that contains of reusable Docusaurus theme components. It aims to unify the components across SWM documentations.

## Installation

Install the package in your project directory with:

`npm install @swmansion/t-rex-ui`

## Usage

To use components in your project you need to simply import them from the package in appriopriate folder, just as in example below:

**PaginatorNavLink/index.js**

```
import { PaginatorNavLink } from '@swmansion/t-rex-ui';
export default PaginatorNavLink;
```

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

## Available theme components

For now following components are available:

- Admonition
- ColorModeToggle
- DocCard
- DocSidebar
- DocSidebarItem
- DocSidebarItems
- DocItem (including DocItemTOCMobile and DocItemMetadata)
- DocVersionBanner
- Footer
- HireUsPage
- Logo
- Navbar
- MDXComponents
- PaginatorNavLink
- SearchPage
- ThemedImage
- TOCCollapsible
- TOCItems (including TOCItems and TOCItemTree)

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

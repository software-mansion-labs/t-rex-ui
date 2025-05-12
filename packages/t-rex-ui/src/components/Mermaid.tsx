// This component is meant to be implemented by a Mermaid renderer theme
// It is notable created to be overridden by docusaurus-theme-mermaid

// By default, the classic theme does not provide any Mermaid implementation
// Yet we declare it there so that we can register it in MDX
// TODO later the mermaid theme should be able to register its MDX component
// see https://github.com/facebook/docusaurus/pull/7490#issuecomment-1279117288

export {default} from '@docusaurus/Noop';

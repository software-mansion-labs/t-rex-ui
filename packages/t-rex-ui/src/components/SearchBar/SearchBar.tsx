import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ThemeConfigAlgolia } from '@docusaurus/theme-search-algolia';
import { DocSearch } from './DocSearch';

export type { CustomAlgoliaConfig };

interface CustomAlgoliaConfig {
  suggestedQuestions?: boolean;
  enableSidePanel?: boolean;
}

export default function SearchBar() {
  const { siteConfig } = useDocusaurusContext();

  const algoliaConfig = siteConfig.themeConfig.algolia as ThemeConfigAlgolia;

  const customAlgoliaConfig = siteConfig.customFields?.algolia as
    | CustomAlgoliaConfig
    | undefined;

  const enableSuggestedQuestions =
    customAlgoliaConfig?.suggestedQuestions ?? false;
  const enableSidePanel = customAlgoliaConfig?.enableSidePanel ?? false;

  return (
    <DocSearch
      {...algoliaConfig}
      suggestedQuestions={enableSuggestedQuestions}
      enableSidePanel={enableSidePanel}
    />
  );
}

// TODO: Add types
import { lazy, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { DocSearchButton, useDocSearchKeyboardEvents } from '@docsearch/react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
  useAlgoliaAskAi,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createPortal } from 'react-dom';
import translations from '../SearchTranslations';
import { ThemeConfigAlgolia } from '@docusaurus/theme-search-algolia';
import '@docsearch/css/dist/style.css';

const DocSearchModal = lazy(() => import('./DocSearchModal'));
const DocSearchSidepanel = lazy(() => import('./DocSearchSidepanel'));

function Hit({ hit, children }: { hit: any; children: any }) {
  return <Link to={hit.url}>{children}</Link>;
}

function ResultsFooter({
  state,
  onClose,
}: {
  state: any;
  onClose: () => void;
}) {
  const createSearchLink = useSearchLinkCreator();
  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{ count: state.context.nbHits }}>
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}

function mergeFacetFilters(f1: any, f2: any) {
  const normalize = (f: any) => (typeof f === 'string' ? [f] : f);
  return [...normalize(f1), ...normalize(f2)];
}

function DocSearch({ contextualSearch, externalUrlRegex, ...props }: any) {
  const { siteMetadata } = useDocusaurusContext();
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
  const configFacetFilters = props.searchParameters?.facetFilters ?? [];
  const facetFilters = contextualSearch
    ? mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : configFacetFilters;

  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  };

  const history = useHistory();
  const searchContainer = useRef(null);
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(undefined);
  const { isAskAiActive, onAskAiToggle } = useAlgoliaAskAi(props);

  const onOpen = useCallback(() => {
    (searchContainer.current as any) = document.createElement('div');
    document.body.insertBefore(
      searchContainer.current as any,
      document.body.firstChild
    );
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    (searchContainer.current as any)?.remove();
  }, [setIsOpen]);

  const onInput = useCallback(
    (event: any) => {
      setIsOpen(true);
      setInitialQuery(event.key);
    },
    [setIsOpen, setInitialQuery]
  );

  const navigator = useRef({
    navigate({ itemUrl }: { itemUrl: string }) {
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl;
      } else {
        history.push(itemUrl);
      }
    },
  }).current;

  const transformItems = useRef((items: any) =>
    props.transformItems
      ? props.transformItems(items)
      : items.map((item: any) => ({
          ...item,
          url: processSearchResultUrl(item.url),
        }))
  ).current;

  const resultsFooterComponent = useMemo(
    () => (footerProps: any) => (
      <ResultsFooter {...footerProps} onClose={onClose} />
    ),
    [onClose]
  );

  const transformSearchClient = useCallback(
    (searchClient: any) => {
      searchClient.addAlgoliaAgent(
        'docusaurus',
        siteMetadata.docusaurusVersion
      );
      return searchClient;
    },
    [siteMetadata.docusaurusVersion]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
    isAskAiActive,
    onAskAiToggle,
  });

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton
        onClick={onOpen}
        ref={searchButtonRef}
        translations={translations.button}
      />

      {isOpen &&
        searchContainer.current &&
        createPortal(
          <Suspense fallback={null}>
            <DocSearchModal
              onClose={onClose}
              initialScrollY={window.scrollY}
              initialQuery={initialQuery}
              navigator={navigator}
              transformItems={transformItems}
              hitComponent={Hit}
              transformSearchClient={transformSearchClient}
              {...(props.searchPagePath && {
                resultsFooterComponent,
              })}
              {...props}
              searchParameters={searchParameters}
              placeholder={translations.placeholder}
              translations={translations.modal}
              isAskAiActive={isAskAiActive}
              onAskAiToggle={onAskAiToggle}
            />
          </Suspense>,
          searchContainer.current
        )}

      {props.enableSidePanel && (
        <Suspense fallback={null}>
          <DocSearchSidepanel
            appId={props.askAi.appId}
            apiKey={props.askAi.apiKey}
            indexName={props.askAi.indexName}
            assistantId={props.askAi.assistantId}
            panel={{
              suggestedQuestions: props.suggestedQuestions,
            }}
          />
        </Suspense>
      )}
    </>
  );
}

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

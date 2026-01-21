import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DocSearchButton, useDocSearchKeyboardEvents } from '@docsearch/react';
import Head from '@docusaurus/Head';
import { useHistory } from '@docusaurus/router';
import { isRegexpStringMatch } from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
  useAlgoliaAskAi,
} from '@docusaurus/theme-search-algolia/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createPortal } from 'react-dom';
import translations from '../SearchTranslations';
import { ThemeConfigAlgolia } from '@docusaurus/theme-search-algolia';
import type { FacetFilters } from 'algoliasearch/lite';
import type { DocSearchHit, DocSearchTransformClient } from '@docsearch/react';
import { Hit } from './Hit';
import { FooterProps, ResultsFooter } from './ResultsFooter';
import { CustomAlgoliaConfig } from './SearchBar';
import useIsBrowser from '@docusaurus/useIsBrowser';
import BrowserOnly from '@docusaurus/BrowserOnly';

import '@docsearch/css/dist/style.css';

const DocSearchModal = lazy(() => import('./DocSearchModal'));
const DocSearchSidepanel = lazy(() => import('./DocSearchSidepanel'));

export { DocSearch };

function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
  const normalize = (f: FacetFilters) => (typeof f === 'string' ? [f] : f);
  return [...normalize(f1), ...normalize(f2)];
}

type DocSearchProps = ThemeConfigAlgolia &
  CustomAlgoliaConfig & {
    transformItems?: (items: DocSearchHit[]) => DocSearchHit[];
  };

function DocSearch({
  contextualSearch,
  externalUrlRegex,
  transformItems: customTransformItems,
  ...props
}: DocSearchProps) {
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
  const searchContainer = useRef<Element>(null);
  const sidepanelContainer = useRef<Element>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const isBrowser = useIsBrowser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidepanelMounted, setIsSidepanelMounted] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined
  );
  const { isAskAiActive, onAskAiToggle } = useAlgoliaAskAi(props);

  useEffect(() => {
    if (isBrowser && !isSidepanelMounted) {
      const div = document.createElement('div');
      sidepanelContainer.current = div;
      document.body.insertBefore(
        sidepanelContainer.current,
        document.body.firstChild
      );
      setIsSidepanelMounted(true);

      return () => {
        if (document.body.contains(div)) {
          document.body.removeChild(div);
        }
      };
    }
  }, [isBrowser, isSidepanelMounted]);

  const onOpen = useCallback(() => {
    searchContainer.current = document.createElement('div');
    document.body.insertBefore(
      searchContainer.current,
      document.body.firstChild
    );
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    searchContainer.current?.remove();
  }, [setIsOpen]);

  const onInput = useCallback(
    (event: KeyboardEvent) => {
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

  const transformItems = useRef((items: DocSearchHit[]) =>
    customTransformItems
      ? customTransformItems(items)
      : items.map((item: DocSearchHit) => ({
          ...item,
          url: processSearchResultUrl(item.url),
        }))
  ).current;

  const resultsFooterComponent = useMemo(
    () => (footerProps: FooterProps) => (
      <ResultsFooter state={footerProps.state} onClose={onClose} />
    ),
    [onClose]
  );

  const transformSearchClient = useCallback(
    (searchClient: DocSearchTransformClient) => {
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

  const askAi = props.askAi?.assistantId
    ? {
        indexName: props.askAi?.indexName
          ? props.askAi.indexName
          : props.indexName,
        apiKey: props.askAi?.apiKey ? props.askAi.apiKey : props.apiKey,
        appId: props.askAi?.appId ? props.askAi.appId : props.appId,
        assistantId: props.askAi?.assistantId,
        suggestedQuestions: props.suggestedQuestions,
      }
    : undefined;

  const preprocessedTranslations = {
    searchBox: {
      clearButtonTitle: translations.modal.searchBox.resetButtonTitle,
      clearButtonAriaLabel: translations.modal.searchBox.resetButtonAriaLabel,
      closeButtonText: translations.modal.searchBox.cancelButtonText,
      closeButtonAriaLabel: translations.modal.searchBox.cancelButtonAriaLabel,
    },
  };

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
              resultsFooterComponent={
                props.searchPagePath ? resultsFooterComponent : undefined
              }
              {...props}
              searchParameters={searchParameters}
              askAi={askAi}
              placeholder={translations.placeholder}
              translations={preprocessedTranslations}
              isAskAiActive={isAskAiActive}
              onAskAiToggle={onAskAiToggle}
            />
          </Suspense>,
          searchContainer.current
        )}

      {props.enableSidePanel &&
        askAi &&
        sidepanelContainer.current &&
        isSidepanelMounted && (
          <BrowserOnly fallback={null}>
            {() =>
              createPortal(
                <Suspense fallback={null}>
                  <DocSearchSidepanel
                    {...askAi}
                    panel={{
                      suggestedQuestions: props.suggestedQuestions,
                    }}
                  />
                </Suspense>,
                sidepanelContainer.current!
              )
            }
          </BrowserOnly>
        )}
    </>
  );
}

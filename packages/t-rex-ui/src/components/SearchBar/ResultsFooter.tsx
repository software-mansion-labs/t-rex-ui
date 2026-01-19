import Link from '@docusaurus/Link';
import { useSearchLinkCreator } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import type { InternalDocSearchHit } from '@docsearch/react';
import { AutocompleteState } from '@algolia/autocomplete-core';

export { ResultsFooter };
export type { FooterProps };

type FooterProps = {
  state: AutocompleteState<InternalDocSearchHit>;
};

function ResultsFooter({
  state,
  onClose,
}: FooterProps & {
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

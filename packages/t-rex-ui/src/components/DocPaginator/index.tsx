import {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import {PaginatorNavLink} from '../PaginatorNavLink';
import type { PropNavigationLink } from '@docusaurus/plugin-content-docs';

type Props = {
  className?: string;
  previous?: PropNavigationLink;
  next?: PropNavigationLink;
}

export default function DocPaginator(props: Props): ReactNode {
  const {className, previous, next} = props;
  return (
    <nav
      className={clsx(className, 'pagination-nav')}
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}>
      {previous && (
        <PaginatorNavLink
          {...previous}
          subLabel={
            <Translate
              id="theme.docs.paginator.previous"
              description="The label used to navigate to the previous doc">
              Previous
            </Translate>
          }
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          subLabel={
            <Translate
              id="theme.docs.paginator.next"
              description="The label used to navigate to the next doc">
              Next
            </Translate>
          }
          isNext
        />
      )}
    </nav>
  );
}

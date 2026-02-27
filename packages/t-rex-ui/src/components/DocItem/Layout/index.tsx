import {type ReactNode} from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '../Paginator';
import {DocVersionBanner} from '../../DocVersionBanner';
import DocVersionBadge from '../../DocVersionBadge';
import DocItemFooter from '../Footer';
import { DocItemTOCMobile } from '../TOC/Mobile';
import DocItemTOCDesktop from '../TOC/Desktop';
import DocItemContent from '../Content';
import {DocBreadcrumbs} from '../../DocBreadcrumbs';
import ContentVisibility from '../../ContentVisibility';

import styles from './styles.module.css';
import { LLMButton } from '../../LLMButton';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export function DocItemLayout({children, showLLMButton = true}: {children: ReactNode, showLLMButton?: boolean}): ReactNode {
  const docTOC = useDocTOC();
  const {metadata} = useDoc();
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            {showLLMButton && <LLMButton />}
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <div style={{clear: 'both'}} />
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}

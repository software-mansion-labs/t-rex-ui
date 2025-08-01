import { useMemo } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useTOCHighlight,
  useFilteredAndTreeifiedTOC,
} from '@docusaurus/theme-common/internal';
import { TOCItemTree, type TOCProp } from './Tree';
import type { TOCItem } from '@docusaurus/mdx-loader';

import {
  ButtonStyling,
  BorderStyling,
  HomepageButton,
} from '../HomepageButton';
import styles from './styles.module.css';

interface TOCItemsProps {
  toc: TOCItem[];
  slot?: React.ReactNode;
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
  className?: string;
  linkClassName?: string | null;
  linkActiveClassName?: string;
}

export function TOCItems({
  toc,
  slot,
  className = 'table-of-contents table-of-contents__left-border',
  linkClassName = 'table-of-contents__link',
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}: TOCItemsProps) {
  const themeConfig = useThemeConfig();
  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;
  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  });
  const tocHighlightConfig = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
  useTOCHighlight(tocHighlightConfig);
  return (
    <>
      <TOCItemTree
        toc={tocTree as unknown as TOCProp[]}
        className={className}
        linkClassName={linkClassName}
        {...props}
      />
      {slot ?? (
        <div className={styles.hireUsContainer}>
          <p>We are Software Mansion.</p>
          <div className={styles.buttonContainer}>
            <HomepageButton
              href="https://swmansion.com/contact/projects?utm_source=rnos-docs&utm_medium=sidebar"
              title="Hire us"
              backgroundStyling={ButtonStyling.TOC}
              borderStyling={BorderStyling.TOC}
              enlarged={false}
            />
          </div>
        </div>
      )}
    </>
  );
}

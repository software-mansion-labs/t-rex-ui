import { useMemo } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useTOCHighlight,
  useFilteredAndTreeifiedTOC,
} from '@docusaurus/theme-common/internal';
import { TOCItemTree } from './Tree';
import { type TOCProp } from './Tree';
import type { TOCItem } from '@docusaurus/mdx-loader';

import { HireUsButton } from '../HireUsButton';
import styles from './styles.module.css';

interface TOCItemsProps {
  toc: TOCItem[];
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
  className?: string;
  linkClassName?: string | null;
  linkActiveClassName?: string;
}

export function TOCItems({
  toc,
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
      <div className={styles.hireUsContainer}>
        <p>We are Software Mansion.</p>
        <div className={styles.buttonContainer}>
          <HireUsButton
            href="https://swmansion.com/contact/projects?utm_source=rnos-docs-sidebar"
            title="Hire us"
          />
        </div>
      </div>
    </>
  );
}

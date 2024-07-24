import clsx from 'clsx';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';
import { TOCItems } from '../TOCItems';
import type { TOCItem } from '@docusaurus/mdx-loader';
import CollapseButton from './CollapseButton';
import styles from './styles.module.css';

interface TOCCollapsibleProps {
  className?: string;
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
  toc: TOCItem[];
}

export function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}: TOCCollapsibleProps) {
  const { collapsed, toggleCollapsed } = useCollapsible({
    initialState: true,
  });
  return (
    <div
      className={clsx(
        styles.tocCollapsible,
        !collapsed && styles.tocCollapsibleExpanded,
        className
      )}>
      <CollapseButton collapsed={collapsed} onClick={toggleCollapsed} />
      <Collapsible
        lazy
        className={styles.tocCollapsibleContent}
        collapsed={collapsed}>
        <TOCItems
          toc={toc}
          minHeadingLevel={minHeadingLevel}
          maxHeadingLevel={maxHeadingLevel}
        />
      </Collapsible>
    </div>
  );
}

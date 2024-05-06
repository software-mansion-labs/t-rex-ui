import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import styles from './styles.module.css';
import type { DocSidebarItemProps } from '..';
import type { PropSidebarItemHtml } from '@docusaurus/plugin-content-docs';

interface DocSidebarItemHtmlProps extends DocSidebarItemProps {
  item: PropSidebarItemHtml;
}

export default function DocSidebarItemHtml({
  item,
  level,
  index,
}: DocSidebarItemHtmlProps) {
  const { value, defaultStyle, className } = item;
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        defaultStyle && [styles.menuHtmlItem, 'menu__list-item'],
        className
      )}
      key={index}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

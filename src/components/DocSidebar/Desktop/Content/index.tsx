import { useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import { DocSidebarItems } from '../../../DocSidebarItems';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

export interface DocSidebarDesktopContentProps {
  className?: string;
  path: string;
  sidebar: PropSidebarItem[];
  experimentalItems?: string[];
  newItems?: string[];
}
function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive]
  );
  return isActive && showAnnouncementBar;
}
export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
  experimentalItems,
  newItems,
}: DocSidebarDesktopContentProps) {
  const showAnnouncementBar = useShowAnnouncementBar();
  return (
    <nav
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className
      )}>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          newItems={newItems}
          experimentalItems={experimentalItems}
          items={sidebar}
          activePath={path}
          level={1}
        />
      </ul>
    </nav>
  );
}

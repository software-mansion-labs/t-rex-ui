import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { type DocSidebarProps } from '..';
import { DocSidebarItems } from '../../DocSidebarItems';

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu = ({
  newItems,
  experimentalItems,
  sidebar,
  path,
}: DocSidebarProps) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      <DocSidebarItems
        items={sidebar}
        newItems={newItems}
        experimentalItems={experimentalItems}
        activePath={path}
        onItemClick={(item) => {
          // Mobile sidebar should only be closed if the category has a link
          if ((item.type === 'category' && item.href) || item.type === 'link') {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
};
function DocSidebarMobile(props: DocSidebarProps) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}
export default React.memo(DocSidebarMobile);

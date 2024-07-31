import { memo } from 'react';
import { DocSidebarItemsExpandedStateProvider } from '@docusaurus/theme-common/internal';
import { DocSidebarItem } from '../DocSidebarItem';
import SidebarLabel from '../SidebarLabel';
import styles from './styles.module.css';
import type { DocSidebarItemProps } from '../DocSidebarItem';

interface DocSidebarItemsProps
  extends Omit<DocSidebarItemProps, 'item' | 'index'> {
  experimentalItems?: string[];
  newItems?: string[];
  deprecatedItems?: string[];
  items: any;
}

// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
const DocSidebarItems = memo(function DocSidebarItems({
  items,
  experimentalItems,
  deprecatedItems,
  newItems,
  ...props
}: DocSidebarItemsProps) {
  return (
    <DocSidebarItemsExpandedStateProvider>
      {items.map((item: any, index: any) => (
        <div className={styles.wrapper} key={`${item.docId}-${index}`}>
          <DocSidebarItem
            newItems={newItems}
            experimentalItems={experimentalItems}
            deprecatedItems={deprecatedItems}
            item={item}
            index={index}
            {...props}
          />
          {experimentalItems && experimentalItems.includes(item.docId!) && (
            <SidebarLabel key={item.docId} type="experimental" />
          )}
          {newItems && newItems.includes(item.docId!) && (
            <SidebarLabel key={item.docId} type="new" />
          )}
          {deprecatedItems && deprecatedItems.includes(item.docId!) && (
            <SidebarLabel key={item.docId} type="deprecated" />
          )}
        </div>
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
});
// Optimize sidebar at each "level"
export { DocSidebarItems };

import { memo } from 'react';
import {
  DocSidebarItemsExpandedStateProvider,
  useVisibleSidebarItems,
} from '@docusaurus/theme-common/internal';
import { DocSidebarItem } from '../DocSidebarItem';
import SidebarLabel from '../SidebarLabel';
import styles from './styles.module.css';
import type { DocSidebarItemProps } from '../DocSidebarItem';

interface DocSidebarItemsProps
  extends Omit<DocSidebarItemProps, 'item' | 'index'> {
  experimentalItems?: string[];
  newItems?: string[];
  deprecatedItems?: string[];
  unreleasedItems?: string[];
  items: any;
}

const DocSidebarItems = memo(function DocSidebarItems({
  items,
  experimentalItems,
  deprecatedItems,
  newItems,
  unreleasedItems,
  ...props
}: DocSidebarItemsProps) {
  const visibleItems = useVisibleSidebarItems(items, props.activePath!);
  return (
    <DocSidebarItemsExpandedStateProvider>
      {visibleItems.map((item: any, index: number) => (
        <div className={styles.wrapper} key={`${item.docId}-${index}`}>
          <DocSidebarItem
            newItems={newItems}
            experimentalItems={experimentalItems}
            deprecatedItems={deprecatedItems}
            unreleasedItems={unreleasedItems}
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
          {unreleasedItems && unreleasedItems.includes(item.docId!) && (
            <SidebarLabel key={item.docId} type="unreleased" />
          )}
        </div>
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
});
// Optimize sidebar at each "level"
export { DocSidebarItems };

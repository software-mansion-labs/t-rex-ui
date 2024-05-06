import { memo } from 'react';
import { DocSidebarItemsExpandedStateProvider } from '@docusaurus/theme-common/internal';
import { DocSidebarItem } from '../DocSidebarItem';
import SidebarLabel from '../SidebarLabel';
import styles from './styles.module.css';
import type { DocSidebarItemProps } from '../DocSidebarItem';

const EXPERIMENTAL_APIs = ['shared-element-transitions/overview'];
const NEW_APIS = ['animations/withClamp'];

interface DocSidebarItemsProps
  extends Omit<DocSidebarItemProps, 'item' | 'index'> {
  items: any;
}

// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
const DocSidebarItems = memo(function DocSidebarItems({
  items,
  ...props
}: DocSidebarItemsProps) {
  return (
    <DocSidebarItemsExpandedStateProvider>
      {items.map((item: any, index: any) => (
        <div className={styles.wrapper} key={`${item.docId}-${index}`}>
          <DocSidebarItem item={item} index={index} {...props} />
          {EXPERIMENTAL_APIs.includes(item.docId!) && (
            <SidebarLabel key={item.docId} type="experimental" />
          )}
          {NEW_APIS.includes(item.docId!) && (
            <SidebarLabel key={item.docId} type="new" />
          )}
        </div>
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
});
// Optimize sidebar at each "level"
export { DocSidebarItems };

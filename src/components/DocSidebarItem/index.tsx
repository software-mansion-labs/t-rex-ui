import DocSidebarItemCategory from './Category';
import DocSidebarItemLink from './Link';
import DocSidebarItemHtml from './Html';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

export interface DocSidebarItemProps {
  activePath: string;
  onItemClick?: (item: PropSidebarItem) => void;
  level: number;
  tabIndex?: number;
  item: PropSidebarItem;
  index: number;
}

export function DocSidebarItem({ item, ...props }: DocSidebarItemProps) {
  switch (item.type) {
    case 'category':
      return <DocSidebarItemCategory item={item} {...props} />;
    case 'html':
      return <DocSidebarItemHtml item={item} {...props} />;
    case 'link':
    default:
      return <DocSidebarItemLink item={item} {...props} />;
  }
}

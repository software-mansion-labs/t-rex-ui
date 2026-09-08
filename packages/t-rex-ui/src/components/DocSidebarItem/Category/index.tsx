import { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
  ThemeClassNames,
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { DocSidebarItems } from '../../DocSidebarItems';
import useCollapsibleSidebar from '../../../hooks/useCollapsibleSidebar';
import styles from './styles.module.css';

import type { MouseEvent } from 'react';
import type { DocSidebarItemProps } from '..';
import type {
  PropSidebarItemLink,
  PropSidebarItemCategory,
} from '@docusaurus/plugin-content-docs';

interface DocSidebarItemCategoryProps extends DocSidebarItemProps {
  item: PropSidebarItemCategory;
}

export default function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  newItems,
  experimentalItems,
  deprecatedItems,
  unreleasedItems,
  ...props
}: DocSidebarItemCategoryProps) {
  const { items, label, className, href } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig();
  const collapsible = useCollapsibleSidebar() && item.collapsible;
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item, collapsible);
  const isActive = isActiveSidebarItem(item, activePath!);
  const isCurrentPage = isSamePath(href, activePath);
  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });
  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  const updateCollapsed = (toCollapsed = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };
  useAutoExpandActiveCategory({
    isActive,
    collapsed,
    updateCollapsed,
    activePath,
  });
  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  const handleItemClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onItemClick?.(item);
    if (href) {
      if (isCurrentPage) {
        e.preventDefault();
        updateCollapsed();
      } else {
        updateCollapsed(false);
      }
    } else {
      e.preventDefault();
      updateCollapsed();
    }
  };

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        styles.categoryItem,
        {
          'menu__list-item--collapsed': collapsed,
        },
        className
      )}>
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': isCurrentPage,
        })}>
        <Link
          className={clsx('menu__link', {
            'menu__link--sublist': collapsible,
            'menu__link--sublist-caret': !href && collapsible,
            'menu__link--active': isActive,
          })}
          onClick={collapsible ? handleItemClick : undefined}
          aria-current={isCurrentPage ? 'page' : undefined}
          role={collapsible && !href ? 'button' : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={
            collapsible ? (hrefWithSSRFallback ?? '#') : hrefWithSSRFallback
          }
          {...props}>
          {label}
        </Link>
        {href && collapsible && (
          <CategoryCollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={(e) => {
              e.preventDefault();
              updateCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items as unknown as PropSidebarItemLink[]}
          newItems={newItems}
          experimentalItems={experimentalItems}
          deprecatedItems={deprecatedItems}
          unreleasedItems={unreleasedItems}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}

/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(
  item: PropSidebarItemCategory,
  collapsible: boolean
) {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser, collapsible]);
}

// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
  activePath,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (toCollapsed?: boolean) => void;
  activePath: string;
}) {
  const wasActive = usePrevious(isActive);
  const previousActivePath = usePrevious(activePath);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    const stillActiveButPathChanged =
      isActive && wasActive && activePath !== previousActivePath;
    if ((justBecameActive || stillActiveButPathChanged) && collapsed) {
      updateCollapsed(false);
    }
  }, [
    isActive,
    wasActive,
    collapsed,
    updateCollapsed,
    activePath,
    previousActivePath,
  ]);
}

function CategoryCollapseButton({
  collapsed,
  categoryLabel,
  onClick,
}: {
  collapsed: boolean;
  categoryLabel: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
                description: 'The ARIA label to expand the sidebar category',
              },
              { label: categoryLabel }
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
                description: 'The ARIA label to collapse the sidebar category',
              },
              { label: categoryLabel }
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className={clsx('clean-btn menu__caret', styles.categoryCaret)}
      onClick={onClick}
    />
  );
}

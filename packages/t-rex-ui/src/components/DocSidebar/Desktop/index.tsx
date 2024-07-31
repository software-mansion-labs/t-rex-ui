import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import { LogoWrapper as Logo } from '../../Logo';
import CollapseButton from './CollapseButton';
import Content from './Content';
import styles from './styles.module.css';
import { type DocSidebarProps } from '..';

function DocSidebarDesktop({
  path,
  sidebar,
  onCollapse,
  heroImages,
  titleImages,
  isHidden,
  experimentalItems,
  deprecatedItems,
  newItems,
}: DocSidebarProps) {
  console.log('doc sidebar desktop', deprecatedItems);
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();
  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden
      )}>
      {hideOnScroll && (
        <Logo
          heroImages={heroImages}
          titleImages={titleImages}
          tabIndex={-1}
          className={styles.sidebarLogo}
        />
      )}
      <Content
        newItems={newItems}
        experimentalItems={experimentalItems}
        deprecatedItems={deprecatedItems}
        path={path}
        sidebar={sidebar}
      />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}
export default React.memo(DocSidebarDesktop);

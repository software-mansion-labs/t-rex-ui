import clsx from 'clsx';
import styles from './styles.module.css';
import AlgoliaSearchBar from '../../../AlgoliaSearchBar';
import usePageType from '../../../../hooks/usePageType';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { ReactNode } from 'react';
import { type NavbarNavLinkProps } from 'src/components/NavbarItem/NavbarNavLink';
import { useThemeConfig } from '@docusaurus/theme-common';
import NavbarNavLink from '../../../NavbarItem/NavbarNavLink';

function isActive(path: string, locationPathname: string) {
  if (locationPathname === path) {
    return true;
  }

  if (locationPathname.startsWith(path.endsWith('/') ? path : `${path}/`)) {
    return true;
  }

  return false;
}

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

export default function NavbarMobileSidebarLayout({
  header,
  isAlgoliaActive,
  secondaryMenu,
}: {
  header: ReactNode;
  isAlgoliaActive?: boolean;
  primaryMenu?: ReactNode;
  secondaryMenu: ReactNode;
}) {
  const { isLanding } = usePageType();

  const data = useAllDocsData();
  const { versions } = data.default;
  const reversed = [...versions].reverse();
  const items: NavbarNavLinkProps[] = useNavbarItems();
  const filteredItems = items.filter((item) => item.label !== undefined);

  const location = useLocation();

  const activeVersion = [...reversed]
    .sort((a, b) => b.path.length - a.path.length)
    .find((version) => isActive(version.path, location.pathname));

  return (
    <div className="navbar-sidebar">
      {header}
      {!isLanding && isAlgoliaActive && <AlgoliaSearchBar />}
      <div className={clsx('navbar-sidebar__items')}>
        <div className="navbar-sidebar__item menu">{secondaryMenu}</div>
      </div>
      <div
        className={clsx(
          filteredItems.length > 1 && styles.sidebarBiggerFooter,
          styles.sidebarFooter
        )}>
        <div>
          {filteredItems.length > 1 &&
            filteredItems.map((item) => (
              <NavbarNavLink
                className={styles.sidebarLinks}
                to={item.to}
                label={item.label}
                key={item.label}
              />
            ))}
        </div>
        <div className={styles.sidebarVersions}>
          <span className={styles.sidebarVersionLabel}>Versions:</span>
          <div className={styles.sidebarVersionLinks}>
            {reversed.map((version) => {
              return (
                <a
                  key={version.label}
                  href={
                    version.isLast
                      ? `${version.path}/${version.mainDocId}`
                      : version.path
                  }
                  className={clsx(
                    styles.sidebarVersion,
                    activeVersion?.label === version.label && styles.active
                  )}>
                  {version.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

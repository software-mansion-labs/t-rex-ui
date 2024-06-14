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
  return locationPathname.startsWith(path);
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
  const items: NavbarNavLinkProps[] = useThemeConfig().navbar.items.filter(
    (item) => item.label !== undefined
  );

  const location = useLocation();
  const activeVersion = reversed.find((version) =>
    isActive(version.path, location.pathname)
  );

  return (
    <div className="navbar-sidebar">
      {header}
      {!isLanding && isAlgoliaActive && <AlgoliaSearchBar />}
      <div className={clsx('navbar-sidebar__items')}>
        <div className="navbar-sidebar__item menu">{secondaryMenu}</div>
      </div>
      <div
        className={clsx(
          items.length > 1 && styles.sidebarBiggerFooter,
          styles.sidebarFooter
        )}>
        <div>
          {items.length > 1 &&
            items.map((item) => {
              return (
                <NavbarNavLink
                  className={styles.sidebarLinks}
                  to={item.to}
                  label={item.label}
                  key={item.label}
                />
              );
            })}
        </div>
        <div className={styles.sidebarVersions}>
          <span className={styles.sidebarVersionLabel}>Versions:</span>
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
  );
}

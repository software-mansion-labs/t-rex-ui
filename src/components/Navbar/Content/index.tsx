import { ReactNode } from 'react';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  useWindowSize,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '../../NavbarItem';
import NavbarColorModeToggle from '../ColorModeToggle';
import NavbarMobileSidebarToggle from '../MobileSidebar/Toggle';
import NavbarLogo from '../Logo';
import styles from './styles.module.css';
import clsx from 'clsx';
// TODO: possibly would not work
import usePageType from '../../../hooks/usePageType';
import { type NavbarItemProps } from '../../NavbarItem';
import AlgoliaSearchBar from '../../AlgoliaSearchBar';

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({ items }: { items: NavbarItemProps[] }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={() =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  const { isLanding } = usePageType();

  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div
        className={clsx(
          'navbar__items navbar__items--right',
          isLanding && styles.navbarItemsLanding
        )}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent({
  heroImages,
  titleImages,
}: {
  heroImages?: { logo: string; title: string };
  titleImages?: { light: string; dark: string };
}) {
  const windowSize = useWindowSize();
  const isMobile = windowSize === 'mobile';

  const { isDocumentation, isLanding } = usePageType();
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <NavbarContentLayout
      left={
        <>
          <div className={styles.logoWrapper}>
            <NavbarLogo heroImages={heroImages} titleImages={titleImages} />
          </div>
          {!isLanding && <NavbarItems items={leftItems} />}
          {!searchBarItem && !isMobile && !isLanding && <AlgoliaSearchBar />}
          {!isMobile && isDocumentation && (
            <NavbarColorModeToggle className={styles.colorModeToggle} />
          )}
        </>
      }
      right={
        <>
          {(isLanding || (!isMobile && !isDocumentation)) && (
            <NavbarColorModeToggle className={styles.colorModeToggle} />
          )}
          <NavbarItems items={rightItems} />
          {!mobileSidebar.disabled && !isLanding && (
            <NavbarMobileSidebarToggle />
          )}
        </>
      }
    />
  );
}

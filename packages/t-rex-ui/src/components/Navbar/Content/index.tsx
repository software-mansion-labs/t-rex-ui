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
import usePageType from '../../../hooks/usePageType';
import { type NavbarItemProps } from '../../NavbarItem';
import AlgoliaSearchBar from '../../AlgoliaSearchBar';
import { NavbarProps } from '..';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
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
  isAlgoliaActive,
  useLandingLogoDualVariant,
  isThemeSwitcherShown,
}: NavbarProps) {
  const windowSize = useWindowSize();
  const isMobile = windowSize === 'mobile';

  const { isDocumentation, isLanding } = usePageType();
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  const searchComponent = isAlgoliaActive ? <AlgoliaSearchBar /> : <div />;

  return (
    <NavbarContentLayout
      left={
        <>
          <div className={styles.logoWrapper}>
            <NavbarLogo
              useLandingLogoDualVariant={useLandingLogoDualVariant}
              heroImages={heroImages}
              titleImages={titleImages}
            />
          </div>
          {!isLanding && <NavbarItems items={leftItems} />}
          {!searchBarItem && !isMobile && !isLanding && searchComponent}
          {!isMobile && isDocumentation && isThemeSwitcherShown && (
            <NavbarColorModeToggle className={styles.colorModeToggle} />
          )}
        </>
      }
      right={
        <>
          {(isLanding || (!isMobile && !isDocumentation)) &&
            isThemeSwitcherShown && (
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

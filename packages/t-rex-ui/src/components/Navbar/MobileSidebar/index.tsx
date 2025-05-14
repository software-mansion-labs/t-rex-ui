import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from './Layout';
import NavbarMobileSidebarHeader from './Header';
import NavbarMobileSidebarPrimaryMenu from './PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from './SecondaryMenu';

export default function NavbarMobileSidebar({
  isThemeSwitcherShown,
  isAlgoliaActive,
}: {
  isThemeSwitcherShown?: boolean;
  isAlgoliaActive?: boolean;
}) {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);
  if (!mobileSidebar.shouldRender) {
    return null;
  }
  return (
    <NavbarMobileSidebarLayout
      isAlgoliaActive={isAlgoliaActive}
      header={
        <NavbarMobileSidebarHeader
          isThemeSwitcherShown={isThemeSwitcherShown}
        />
      }
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}

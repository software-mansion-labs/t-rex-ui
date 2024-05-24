import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '../MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '../MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '../MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '../MobileSidebar/SecondaryMenu';

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

import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '../MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '../MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '../MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '../MobileSidebar/SecondaryMenu';

export default function NavbarMobileSidebar() {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);
  if (!mobileSidebar.shouldRender) {
    return null;
  }
  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}

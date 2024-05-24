import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarColorModeToggle from '../../ColorModeToggle';
import IconClose from '../../../Icon/Close';
import NavbarLogo from '../../Logo';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}>
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}
export default function NavbarMobileSidebarHeader({
  isThemeSwitcherShown,
}: {
  isThemeSwitcherShown?: boolean;
}) {
  return (
    <div className="navbar-sidebar__brand">
      <NavbarLogo />
      {isThemeSwitcherShown && (
        <NavbarColorModeToggle className="margin-right--md" />
      )}
      <CloseButton />
    </div>
  );
}

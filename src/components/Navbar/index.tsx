import NavbarLayout from './Layout';
import NavbarContent from './Content';

export interface NavbarProps {
  heroImages?: { logo: string; title?: string };
  titleImages?: { light: string; dark: string };
  isAlgoliaActive?: boolean;
  isThemeSwitcherShown?: boolean;
}

export function Navbar({
  heroImages,
  titleImages,
  isAlgoliaActive = true,
  isThemeSwitcherShown = true,
}: NavbarProps) {
  return (
    <NavbarLayout
      isAlgoliaActive={isAlgoliaActive}
      isThemeSwitcherShown={isThemeSwitcherShown}>
      <NavbarContent
        isThemeSwitcherShown={isThemeSwitcherShown}
        isAlgoliaActive={isAlgoliaActive}
        heroImages={heroImages}
        titleImages={titleImages}
      />
    </NavbarLayout>
  );
}

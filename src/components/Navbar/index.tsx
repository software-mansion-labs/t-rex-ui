import NavbarLayout from './Layout';
import NavbarContent from './Content';

export interface NavbarProps {
  heroImages?: { logo: string; title?: string };
  titleImages?: { light: string; dark: string };
  useLandingLogoDualVariant?: boolean;
  isAlgoliaActive?: boolean;
  isThemeSwitcherShown?: boolean;
}

export function Navbar({
  heroImages,
  titleImages,
  isAlgoliaActive = true,
  isThemeSwitcherShown = true,
  useLandingLogoDualVariant = false,
}: NavbarProps) {
  return (
    <NavbarLayout
      isAlgoliaActive={isAlgoliaActive}
      isThemeSwitcherShown={isThemeSwitcherShown}>
      <NavbarContent
        isThemeSwitcherShown={isThemeSwitcherShown}
        isAlgoliaActive={isAlgoliaActive}
        useLandingLogoDualVariant={useLandingLogoDualVariant}
        heroImages={heroImages}
        titleImages={titleImages}
      />
    </NavbarLayout>
  );
}

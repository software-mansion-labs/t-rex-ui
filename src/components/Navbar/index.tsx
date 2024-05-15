import NavbarLayout from './Layout';
import NavbarContent from './Content';

export interface NavbarProps {
  heroImages?: { logo: string; title?: string };
  titleImages?: { light: string; dark: string };
  useTitleLogoOnLandingPage?:boolean
}

export function Navbar({
  heroImages,
  titleImages,
  useTitleLogoOnLandingPage
}: NavbarProps
) {
  return (
    <NavbarLayout>
      <NavbarContent useTitleLogoOnLandingPage={useTitleLogoOnLandingPage} heroImages={heroImages} titleImages={titleImages} />
    </NavbarLayout>
  );
}

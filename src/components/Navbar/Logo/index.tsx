import { NavbarProps } from '..';
import { LogoWrapper as Logo } from '../../Logo';

export default function NavbarLogo({
  heroImages,
  titleImages,
  useTitleLogoOnLandingPage
}: NavbarProps) {
  return (
    <Logo
      heroImages={heroImages}
      titleImages={titleImages}
      useTitleLogoOnLandingPage={useTitleLogoOnLandingPage}
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}

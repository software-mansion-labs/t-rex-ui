import { NavbarProps } from '..';
import { LogoWrapper as Logo } from '../../Logo';

export default function NavbarLogo({
  heroImages,
  titleImages,
  useLandingLogoDualVariant,
}: NavbarProps) {
  return (
    <Logo
      heroImages={heroImages}
      titleImages={titleImages}
      useLandingLogoDualVariant={useLandingLogoDualVariant}
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}

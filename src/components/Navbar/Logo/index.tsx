import { NavbarProps } from '..';
import { LogoWrapper as Logo } from '../../Logo';

export default function NavbarLogo({
  heroImages,
  titleImages,
}: NavbarProps) {
  return (
    <Logo
      heroImages={heroImages}
      titleImages={titleImages}
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}

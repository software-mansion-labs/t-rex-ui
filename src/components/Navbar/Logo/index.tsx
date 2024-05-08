import { LogoWrapper as Logo } from '../../Logo';

export default function NavbarLogo({
  heroImages,
  titleImages,
}: {
  heroImages?: { logo: string; title: string };
  titleImages?: { light: string; dark: string };
}) {
  return (
    <Logo
      heroImages={heroImages}
      titleImages={titleImages}
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}

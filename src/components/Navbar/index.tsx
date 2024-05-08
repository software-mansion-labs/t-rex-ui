import NavbarLayout from './Layout';
import NavbarContent from './Content';

export function Navbar({
  heroImages,
  titleImages,
}: {
  heroImages?: { logo: string; title: string };
  titleImages?: { light: string; dark: string };
}) {
  return (
    <NavbarLayout>
      <NavbarContent heroImages={heroImages} titleImages={titleImages} />
    </NavbarLayout>
  );
}

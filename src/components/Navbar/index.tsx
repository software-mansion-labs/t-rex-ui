import NavbarLayout from './Layout';
import NavbarContent from './Content';

export interface NavbarProps {
  heroImages?: { logo: string; title?: string };
  titleImages?: { light: string; dark: string };
}

export function Navbar({
  heroImages,
  titleImages,
}: NavbarProps
) {
  return (
    <NavbarLayout>
      <NavbarContent heroImages={heroImages} titleImages={titleImages} />
    </NavbarLayout>
  );
}

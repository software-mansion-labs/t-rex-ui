import NavbarLayout from './Layout';
import NavbarContent from './Content';

export interface NavbarProps {
  heroImages?: { logo: string; title?: string };
  titleImages?: { light: string; dark: string };
  isAlgolia?: boolean
  isToggle?: boolean
}

export function Navbar({
  heroImages,
  titleImages,
  isAlgolia,
  isToggle
}: NavbarProps
) {
  return (
    <NavbarLayout>
      <NavbarContent isToggle={isToggle} isAlgolia={isAlgolia} heroImages={heroImages} titleImages={titleImages} />
    </NavbarLayout>
  );
}

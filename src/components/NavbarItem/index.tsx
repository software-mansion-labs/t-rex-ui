import { MouseEvent } from 'react';
import ComponentTypes from './ComponentTypes';
import { NavbarNavLinkProps } from './NavbarNavLink';

function normalizeComponentType(type: string, props: any) {
  // Backward compatibility: navbar item with no type set
  // but containing dropdown items should use the type "dropdown"
  if (!type || type === 'default') {
    return 'items' in props ? 'dropdown' : 'default';
  }
  return type;
}

export interface NavbarItemProps extends NavbarNavLinkProps {
  type?: string;
  mobile?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  isDropdownItem?: boolean;
  dropdownActiveClassDisabled?: boolean;
  activeClassName?: string;
}

export default function NavbarItem({ type, ...props }: NavbarItemProps) {
  const componentType = normalizeComponentType(type!, props);
  const NavbarItemComponent = ComponentTypes[componentType];
  if (!NavbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }
  return <NavbarItemComponent {...props} />;
}

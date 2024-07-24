import clsx from 'clsx'
import NavbarNavLink from './NavbarNavLink'

interface DefaultNavbarItemProps {
  activeClassName: string
  className?: string
  isDropdownItem?: boolean
}

function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}: DefaultNavbarItemProps) {
  const element = (
    <NavbarNavLink
      className={clsx(
        isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link',
        className
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  )
  if (isDropdownItem) {
    return <li>{element}</li>
  }
  return element
}
function DefaultNavbarItemMobile({
  className,
  isDropdownItem,
  ...props
}: DefaultNavbarItemProps) {
  return (
    <li className='menu__list-item'>
      <NavbarNavLink className={clsx('menu__link', className)} {...props} />
    </li>
  )
}
export default function DefaultNavbarItem({
  mobile = false,
  position, // Need to destructure position from props so that it doesn't get passed on.
  ...props
}: {
  isActive?: () => boolean
  label?: string
  to?: string
  exact?: boolean
  mobile?: boolean
  position?: string
  activeClassName?: string
}) {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop
  return (
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'navbar__link--active')
      }
    />
  )
}

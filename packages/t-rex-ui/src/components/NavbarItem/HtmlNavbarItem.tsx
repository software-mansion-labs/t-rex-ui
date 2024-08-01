import clsx from 'clsx';

interface HtmlNavbarItemProps {
  value: HTMLElement;
  className: string;
  mobile: boolean;
  isDropdownItem: boolean;
}

export default function HtmlNavbarItem({
  value,
  className,
  mobile = false,
  isDropdownItem = false,
}: HtmlNavbarItemProps) {
  const Comp = isDropdownItem ? 'li' : 'div';
  return (
    <Comp
      className={clsx(
        {
          navbar__item: !mobile && !isDropdownItem,
          'menu__list-item': mobile,
        },
        className
      )}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

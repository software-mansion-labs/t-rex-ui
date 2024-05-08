import clsx from 'clsx';
import styles from './styles.module.css';

export default function NavbarSearch({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return <div className={clsx(className, styles.searchBox)}>{children}</div>;
}

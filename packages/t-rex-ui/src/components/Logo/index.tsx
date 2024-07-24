import LogoStyling from './LogoStyling';
import clsx from 'clsx';
// import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css';
import type { NavbarProps } from '../Navbar';

export interface LogoWrapperProps extends NavbarProps {
  tabIndex?: number;
  titleClassName?: string;
  imageClassName?: string;
  className?: string;
}

export function LogoWrapper({
  titleClassName,
  titleImages,
  heroImages,
  className,
  useLandingLogoDualVariant,
}: LogoWrapperProps) {
  // TODO:
  // instead of passing heroImages to DocSidebarDesktop pass them directly to Logo from project

  return (
    <div className={styles.logoWrapper}>
      <LogoStyling
        titleImages={titleImages}
        heroImages={heroImages}
        useLandingLogoDualVariant={useLandingLogoDualVariant}
        imageClassName={clsx(className, styles.navbar__logo)}
        titleClassName={clsx(titleClassName, styles.navbar__title)}
      />
    </div>
  );
}

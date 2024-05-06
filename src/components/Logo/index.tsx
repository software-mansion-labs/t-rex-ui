import LogoStyling from './LogoStyling'
import clsx from 'clsx'
// import useBaseUrl from '@docusaurus/useBaseUrl'
import usePageType from '../../hooks/usePageType'
import styles from './styles.module.css'

export interface LogoWrapperProps {
  tabIndex?: number
  titleImages?: { light: string; dark: string }
  heroImages?: { logo: string; title?: string }
  titleClassName?: string
  imageClassName?: string
  className?: string
}

export function LogoWrapper({
  titleClassName,
  titleImages,
  heroImages,
  className,
}: LogoWrapperProps) {
  // TODO:
  // instead of passing heroImages to DocSidebarDesktop pass them directly to Logo from project
  const { isLanding } = usePageType()

  return (
    <div className={styles.logoWrapper}>
      <LogoStyling
        titleImages={titleImages}
        heroImages={heroImages}
        className={clsx(
          className,
          isLanding ? styles.navbar__logo_landing : styles.navbar__logo
        )}
        titleClassName={clsx(titleClassName, styles.navbar__title)}
      />
    </div>
  )
}

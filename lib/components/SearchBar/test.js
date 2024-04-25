import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import usePageType from '@site/src/hooks/usePageType'

function NavbarBackdrop(props) {
  return (
    <div
      role='presentation'
      {...props}
      className={clsx('navbar-sidebar__backdrop', props.className)}
    />
  )
}

const LandingBackground = ({ isAnnouncementBarActive = false }) => {
  return (
    <div
      className={styles.heroBackground}
      data-announcement-bar={isAnnouncementBarActive}
    >
      <Clouds />
      <Stars />

      {
        /* Swirl uses viewport behind the hood to calculate appropriate width.
         * Thus, access to the viewport is required to render the Swirl component.
         */
        ExecutionEnvironment.canUseViewport && (
          <>
            <Sun />
            <Swirl />
          </>
        )
      }
    </div>
  )
}

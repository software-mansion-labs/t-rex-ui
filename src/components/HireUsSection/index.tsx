import {
  ButtonStyling,
  BorderStyling,
  HomepageButton,
} from '../HomepageButton';
import styles from './styles.module.css';

export const HireUsSection = ({ content }: { content?: string }) => {
  return (
    <div className={styles.hireUsSectionWrapper}>
      <div className={styles.hireUsTitleContainer}>
        <h2>
          We are <span>Software Mansion</span>
        </h2>
      </div>
      <p className={styles.hireUsSectionBody}>
        {content ? (
          content
        ) : (
          <>
            React Native Core Contributors and experts in dealing with all kinds
            of React Native issues. No matter if you need help with gestures,
            animations or React Native development we can help.
          </>
        )}
      </p>

      <div className={styles.hireUsButton}>
        <HomepageButton
          href="https://swmansion.com/contact/projects?utm_source=gesture-handler&utm_medium=docs"
          title="Hire us"
          backgroundStyling={ButtonStyling.SECTION}
          borderStyling={BorderStyling.SECTION}
        />
      </div>
    </div>
  );
};

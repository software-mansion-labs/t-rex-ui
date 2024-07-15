import React from 'react';
import styles from './styles.module.css';

import ArrowRight from '../Icon/ArrowRight';
import clsx from 'clsx';

export const ButtonStyling = {
  TOC: styles.buttonBlueStyling,
  SECTION: styles.buttonNavyStyling,
};

export const BorderStyling = {
  TOC: styles.buttonBlueBorderStyling,
  SECTION: styles.buttonNavyBorderStyling,
};

export const HomepageButton: React.FC<{
  title: string;
  href: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  enlarged?: boolean;
  backgroundStyling?: string;
  borderStyling?: string;
}> = ({
  title,
  href,
  target = '_self',
  enlarged = true,
  backgroundStyling = ButtonStyling.SECTION,
  borderStyling = BorderStyling.SECTION,
}) => {
  return (
    <a href={href} target={target} className={styles.homepageButtonLink}>
      <div
        className={clsx(
          styles.homepageButton,
          enlarged
            ? styles.homepageButtonEnlarged
            : styles.homepageButtonNormal,
          backgroundStyling,
          borderStyling
        )}>
        {title}

        <div className={styles.arrow}>
          <ArrowRight />
        </div>
      </div>
    </a>
  );
};

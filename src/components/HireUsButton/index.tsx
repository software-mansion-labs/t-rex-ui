import React from 'react';
import styles from './styles.module.css';

import ArrowRight from '../Icon/ArrowRight';
import clsx from 'clsx';

export const HireUsButton: React.FC<{
  title: string;
  href: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  enlarged?: boolean;
}> = ({
  title,
  href,
  target = '_self',
}) => {
  return (
    <a href={href} target={target} className={styles.homepageButtonLink}>
      <div
        className={clsx(
          styles.homepageButton,
          styles.buttonNavyStyling,
          styles.buttonNavyBorderStyling
        )}>
        {title}

        <div className={styles.arrow}>
          <ArrowRight/>
        </div>
      </div>
    </a>
  );
};


import React from 'react';
import clsx from 'clsx';
// import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import IconLightMode from '../Icon/LightMode';
import IconDarkMode from '../Icon/DarkMode';
import styles from './styles.module.css';
import usePageType from '../../hooks/usePageType';

const ColorModeToggle = React.memo(function ColorModeToggle({
  className,
  buttonClassName,
  value,
  onChange,
}: any) {
  // const isBrowser = useIsBrowser();
  /* Color scheme switcher from MUI framework. */
  const { isLanding } = usePageType();

  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        value === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    }
  );

  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          'clean-btn',
          styles.toggleButton,
          // !isBrowser && styles.toggleButtonDisabled,
          isLanding && styles.toggleButtonLanding,
          buttonClassName
        )}
        type="button"
        onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
        // disabled={!isBrowser}
        title={title}
        aria-label={title}
        aria-live="polite">
        <div
          className={clsx(
            styles.iconContainer,
            styles.lightToggleIcon,
            isLanding && styles.iconLandingContainer
          )}>
          <IconLightMode />
        </div>
        <div
          className={clsx(
            styles.iconContainer,
            styles.darkIconContainer,
            styles.darkToggleIcon,
            isLanding && styles.iconLandingContainer
          )}>
          <IconDarkMode />
        </div>
      </button>
    </div>
  );
});

export { ColorModeToggle };

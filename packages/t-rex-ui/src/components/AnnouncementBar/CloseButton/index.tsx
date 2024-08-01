import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import IconClose from '../../Icon/Close';
import styles from './styles.module.css';

export default function AnnouncementBarCloseButton(props: {
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.AnnouncementBar.closeButtonAriaLabel',
        message: 'Close',
        description: 'The ARIA label for close button of announcement bar',
      })}
      {...props}
      className={clsx('clean-btn close', styles.closeButton, props.className)}>
      <IconClose width={14} height={14} strokeWidth={3.1} color={'#fff'} />
    </button>
  );
}

import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function TOCCollapsibleCollapseButton({
  collapsed,
  ...props
}: {
  collapsed: boolean;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'clean-btn',
        styles.tocCollapsibleButton,
        !collapsed && styles.tocCollapsibleButtonExpanded,
        props.className
      )}>
      <Translate
        id="theme.TOCCollapsible.toggleButtonLabel"
        description="The label used by the button on the collapsible TOC component">
        On this page
      </Translate>
    </button>
  );
}

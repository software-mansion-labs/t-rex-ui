import styles from './styles.module.css';
import clsx from 'clsx';

interface Props {
  type: 'new' | 'experimental' | 'deprecated';
}

export default function SidebarLabel({ type }: Props) {
  return (
    <div
      className={clsx(
        styles.badge,
        type === 'new' && styles.new,
        type === 'experimental' && styles.experimental,
        type === 'deprecated' && styles.deprecated
      )}>
      {type}
    </div>
  );
}

import {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export interface TagProps {
  permalink: string;
  label: string;
  count?: number;
  description?: string;
}

export default function Tag({
  permalink,
  label,
  count,
  description,
}: TagProps): ReactNode {
  return (
    <Link
      rel="tag"
      href={permalink}
      title={description}
      className={clsx(
        styles.tag,
        count ? styles.tagWithCount : styles.tagRegular,
      )}>
      {label}
      {count && <span>{count}</span>}
    </Link>
  );
}

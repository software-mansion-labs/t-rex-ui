import { type ReactNode } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

function transformImgClassName(className?: string): string {
  return clsx(className, styles.img);
}

export default function MDXImg(props: any): ReactNode {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      decoding="async"
      loading="lazy"
      {...props}
      className={transformImgClassName(props.className)}
    />
  );
}

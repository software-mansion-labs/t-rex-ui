import { type ReactNode } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

function transformUlClassName(className?: string): string | undefined {
  // Fix https://github.com/facebook/docusaurus/issues/9098
  if (typeof className === 'undefined') {
    return undefined;
  }
  return clsx(
    className,
    // This class is set globally by GitHub/MDX. We keep the global class, and
    // add another class to get a task list without the default ul styling
    // See https://github.com/syntax-tree/mdast-util-to-hast/issues/28
    className?.includes('contains-task-list') && styles.containsTaskList
  );
}

export default function MDXUl(props: any): ReactNode {
  return <ul {...props} className={transformUlClassName(props.className)} />;
}

import React from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import type { TOCItem } from '@docusaurus/mdx-loader'
// Recursive component rendering the toc tree

export interface TOCProp extends TOCItem {
  children?: TOCItem[]
}

interface TOCItemTreeProps {
  toc?: TOCProp[]
  className: string
  linkClassName: string | null
  isChild?: boolean
}
const TOCItemTree = React.memo(function TOCItemTree({
  toc,
  className,
  linkClassName,
  isChild,
}: TOCItemTreeProps) {
  if (!toc!.length) {
    return null
  }
  return (
    <ul className={clsx(styles.tocItems, isChild ? undefined : className)}>
      {toc!.map((heading) => (
        <li key={heading.id}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a
            href={`#${heading.id}`}
            className={linkClassName ?? undefined}
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `<span>${heading.value}</span>`,
            }}
          />
          <TOCItemTree
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  )
})
// Memo only the tree root is enough
export { TOCItemTree }

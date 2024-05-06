import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/theme-common/internal'
import { TOCCollapsible } from '../../../TOCCollapsible'
import type { TOCItem } from '@docusaurus/mdx-loader'
import styles from './styles.module.css'

export function DocItemTOCMobile() {
  const { toc, frontMatter } = useDoc()
  return (
    <div className={styles.toc_mobile__wrapper}>
      <TOCCollapsible
        toc={toc as unknown as TOCItem[]}
        minHeadingLevel={frontMatter.toc_min_heading_level}
        maxHeadingLevel={frontMatter.toc_max_heading_level}
        className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}
      />
    </div>
  )
}

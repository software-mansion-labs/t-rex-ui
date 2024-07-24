import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import styles from './styles.module.css';
import { AnnouncementBarConfig } from 'node_modules/@docusaurus/theme-common/lib/utils/useThemeConfig';
export default function AnnouncementBarContent(props:{className?: string}) {
  const {announcementBar} = useThemeConfig();
  const {content} = announcementBar as AnnouncementBarConfig
  return (
    <div
      {...props}
      className={clsx(styles.content, props.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
}

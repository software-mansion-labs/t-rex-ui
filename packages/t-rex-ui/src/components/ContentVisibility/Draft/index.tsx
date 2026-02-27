import {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  ThemeClassNames,
  DraftBannerTitle,
  DraftBannerMessage,
} from '@docusaurus/theme-common';
import {Admonition} from '../../Admonition';

export default function Draft({className}: {className?: string}): ReactNode {
  return (
    <Admonition
      type="caution"
      title={<DraftBannerTitle />}
      className={clsx(className, ThemeClassNames.common.draftBanner)}>
      <DraftBannerMessage />
    </Admonition>
  );
}

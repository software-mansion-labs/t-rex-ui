import {type ReactNode} from 'react';

import Draft from './Draft';
import Unlisted from './Unlisted';

export default function ContentVisibility({metadata}: {metadata: any}): ReactNode {
  const {unlisted, frontMatter} = metadata;
  // Reading draft/unlisted status from frontMatter is useful to display
  // the banners in dev mode (in dev, metadata.unlisted is always false)
  // See https://github.com/facebook/docusaurus/issues/8285
  return (
    <>
      {(unlisted || frontMatter.unlisted) && <Unlisted />}
      {frontMatter.draft && <Draft />}
    </>
  );
}

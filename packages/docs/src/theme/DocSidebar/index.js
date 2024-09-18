import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { DocSidebar } from '@swmansion/t-rex-ui';

export default function DocSidebarWrapper(props) {
  const heroImages = {
    logo: useBaseUrl('/img/logo.svg'),
    title: useBaseUrl('/img/logo.svg'),
  };

  const newItems = ['fundamentals/lorem'];
  const experimentalItems = ['fundamentals/lorem-ipsum'];
  const deprecatedItems = ['fundamentals/lorem-ipsum-dolor'];
  const unreleasedItems = ['tutorial-extras/lorem'];

  return (
    <DocSidebar
      newItems={newItems}
      experimentalItems={experimentalItems}
      deprecatedItems={deprecatedItems}
      unreleasedItems={unreleasedItems}
      heroImages={heroImages}
      {...props}
    />
  );
}

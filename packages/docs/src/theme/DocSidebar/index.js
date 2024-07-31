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

  return (
    <DocSidebar
      newItems={newItems}
      experimentalItems={experimentalItems}
      deprecatedItems={deprecatedItems}
      heroImages={heroImages}
      {...props}
    />
  );
}

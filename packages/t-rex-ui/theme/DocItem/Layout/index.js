import React from 'react';
import useGlobalData from '@docusaurus/useGlobalData';
import { DocItemLayout } from '@swmansion/t-rex-ui';

export default function DocItemLayoutWrapper(props) {
  const globalData = useGlobalData();
  const { showLLMButton = true } =
    globalData?.['docusaurus-plugin-t-rex-ui-theme']?.['default'] ?? {};
  return <DocItemLayout {...props} showLLMButton={showLLMButton} />;
}

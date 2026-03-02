import useGlobalData from '@docusaurus/useGlobalData';
import { DocItemLayout } from '@swmansion/t-rex-ui';
import MDXContent from '@theme/MDXContent';

export default function DocItemLayoutWrapper(props) {
  const globalData = useGlobalData();
  const { showLLMButton = true } =
    globalData?.['docusaurus-plugin-t-rex-ui-theme']?.['default'] ?? {};
  const { children, ...rest } = props;
  return (
    <DocItemLayout {...rest} showLLMButton={showLLMButton}>
      <MDXContent>{children}</MDXContent>
    </DocItemLayout>
  );
}

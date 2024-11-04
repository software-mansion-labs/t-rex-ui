import AdmonitionTypeNote from './Type/Note';
import AdmonitionTypeTip from './Type/Tip';
import AdmonitionTypeInfo from './Type/Info';
import AdmonitionTypeWarning from './Type/Warning';
import AdmonitionTypeDanger from './Type/Danger';
import AdmonitionTypeCaution from './Type/Caution';

export type AdmonitionType = keyof typeof admonitionTypes;

export interface AdmonitionTypeProps {
  type: AdmonitionType;
  className?: string;
  children: React.ReactNode;
}

const admonitionTypes = {
  note: AdmonitionTypeNote,
  tip: AdmonitionTypeTip,
  info: AdmonitionTypeInfo,
  warning: AdmonitionTypeWarning,
  danger: AdmonitionTypeDanger,
};
// Undocumented legacy admonition type aliases
// Provide hardcoded/untranslated retrocompatible label
// See also https://github.com/facebook/docusaurus/issues/7767
const admonitionAliases = {
  secondary: (props: any) => (
    <AdmonitionTypeNote title="secondary" {...props} />
  ),
  important: (props: any) => (
    <AdmonitionTypeInfo title="important" {...props} />
  ),
  success: (props: any) => <AdmonitionTypeTip title="success" {...props} />,
  caution: AdmonitionTypeCaution,
};
export default {
  ...admonitionTypes,
  ...admonitionAliases,
};

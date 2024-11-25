import { processAdmonitionProps } from '@docusaurus/theme-common';
import AdmonitionTypes, { type AdmonitionType } from './Types';

function getAdmonitionTypeComponent(type: AdmonitionType) {
  const component = AdmonitionTypes[type];
  if (component) {
    return component;
  }
  console.warn(
    `No admonition component found for admonition type "${type}". Using Info as fallback.`
  );
  return AdmonitionTypes.info;
}
export function Admonition(unprocessedProps: any) {
  const props = processAdmonitionProps(unprocessedProps);
  const AdmonitionTypeComponent = getAdmonitionTypeComponent(props.type);
  return <AdmonitionTypeComponent {...props} />;
}

import { useDocsVersionCandidates } from '@docusaurus/theme-common/internal';
import DefaultNavbarItem from './DefaultNavbarItem';
import { type GlobalVersion } from '@docusaurus/plugin-content-docs/client';

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId);

export default function DocsVersionNavbarItem({
  label: staticLabel,
  to: staticTo,
  docsPluginId,
  ...props
}: {
  label: string;
  to: string;
  docsPluginId?: string;
}) {
  const version = useDocsVersionCandidates(docsPluginId)[0];
  const label = staticLabel ?? version.label;
  const path = staticTo ?? getVersionMainDoc(version)?.path;
  return <DefaultNavbarItem {...props} label={label} to={path} />;
}

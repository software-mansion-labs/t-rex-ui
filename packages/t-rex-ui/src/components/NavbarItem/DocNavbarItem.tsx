import {
  useActiveDocContext,
  useLayoutDoc,
} from '@docusaurus/plugin-content-docs/client';
import DefaultNavbarItem from './DefaultNavbarItem';

export interface DocNavbarItemProps {
  docId: string;
  docsPluginId?: string;
  label: string;
}

export default function DocNavbarItem({
  docId,
  label: staticLabel,
  docsPluginId,
  ...props
}: DocNavbarItemProps) {
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const doc = useLayoutDoc(docId, docsPluginId);
  // Draft items are not displayed in the navbar.
  if (doc === null) {
    return null;
  }
  return (
    <DefaultNavbarItem
      exact
      {...props}
      isActive={() =>
        activeDoc?.path === doc.path ||
        (!!activeDoc?.sidebar && activeDoc.sidebar === doc.sidebar)
      }
      label={staticLabel ?? doc.id}
      to={doc.path}
    />
  );
}

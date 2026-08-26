import {
  useVersions,
  useActiveDocContext,
  useDocsVersionCandidates,
  useDocsPreferredVersion,
  type GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';

import DefaultNavbarItem from './DefaultNavbarItem';
import DropdownNavbarItem from './DropdownNavbarItem';
import { NavbarNavLinkProps } from './NavbarNavLink';
import {
  findVersionCounterpartDoc,
  useVersionCounterpartMap,
} from '../../utils/versionCounterpart';

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId);

interface DocsVersionDropdownNavbarItemProps {
  mobile: boolean;
  docsPluginId: string;
  dropdownActiveClassDisabled: boolean;
  dropdownItemsBefore: NavbarNavLinkProps[];
  dropdownItemsAfter: NavbarNavLinkProps[];
}

export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}: DocsVersionDropdownNavbarItemProps) {
  const { search, hash } = useLocation();
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const counterpartMap = useVersionCounterpartMap();
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  const versionLinks = versions.map((version) => {
    // We try to link to the same doc, in another version. When the doc id
    // changed between versions, we consult the opt-in counterpart map. When
    // neither is possible, fallback to the "main doc" of the version.
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      findVersionCounterpartDoc(
        activeDocContext.activeDoc,
        version,
        counterpartMap,
      ) ??
      getVersionMainDoc(version);
    return {
      label: version.label,
      // preserve ?search#hash suffix on version switches
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  });
  const items = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];
  const dropdownVersion = useDocsVersionCandidates(docsPluginId)[0];
  // Mobile dropdown is handled a bit differently
  const dropdownLabel =
    mobile && items.length > 1
      ? translate({
          id: 'theme.navbar.mobileVersionsDropdown.label',
          message: 'Versions',
          description:
            'The label for the navbar versions dropdown on mobile view',
        })
      : dropdownVersion.label;
  const dropdownTo =
    mobile && items.length > 1
      ? undefined
      : getVersionMainDoc(dropdownVersion)?.path;
  // We don't want to render a version dropdown with 0 or 1 item. If we build
  // the site with a single docs version (onlyIncludeVersions: ['1.0.0']),
  // We'd rather render a button instead of a dropdown
  if (items.length <= 1) {
    return (
      <DefaultNavbarItem
        {...props}
        mobile={mobile}
        label={dropdownLabel}
        to={dropdownTo}
        isActive={dropdownActiveClassDisabled ? () => false : undefined}
      />
    );
  }
  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={dropdownTo}
      items={items}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
    />
  );
}

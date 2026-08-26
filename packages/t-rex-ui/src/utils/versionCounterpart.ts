import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {
  GlobalDoc,
  GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';

/**
 * Opt-in map used to link a page to its counterpart in the latest docs version
 * when the doc id changed between versions (e.g. after a docs reorganization).
 *
 * Keys and values are doc ids (`GlobalDoc.id`), for example:
 * `{ 'api/hooks/useAnimatedStyle': 'core/useAnimatedStyle' }`.
 *
 * Provide it through `customFields.versionCounterpartMap` in the site config.
 * When absent, the version dropdown and the version banner keep their default
 * behavior (fall back to the latest version's main doc).
 */
export type VersionCounterpartMap = Record<string, string>;

export function useVersionCounterpartMap(): VersionCounterpartMap | undefined {
  const { siteConfig } = useDocusaurusContext();
  return siteConfig.customFields?.versionCounterpartMap as
    | VersionCounterpartMap
    | undefined;
}

/**
 * Resolves the current page's counterpart in the target version using the
 * opt-in map. Returns `undefined` (so callers can fall through to their
 * default) when there is no map, no active doc, the target is not the latest
 * version, or the map has no entry for the current page.
 */
export function findVersionCounterpartDoc(
  activeDoc: GlobalDoc | undefined,
  targetVersion: GlobalVersion,
  counterpartMap: VersionCounterpartMap | undefined,
): GlobalDoc | undefined {
  if (!counterpartMap || !activeDoc || !targetVersion.isLast) {
    return undefined;
  }
  const targetId = counterpartMap[activeDoc.id];
  if (!targetId) {
    return undefined;
  }
  return targetVersion.docs.find((doc) => doc.id === targetId);
}

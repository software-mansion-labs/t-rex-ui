import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  useActivePlugin,
  useDocVersionSuggestions,
  useDocsPreferredVersion,
  useDocsVersion,
} from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs';
import styles from '../Admonition/styles.module.css';

function UnreleasedVersionLabel({
  siteTitle,
  versionMetadata,
}: {
  siteTitle: string;
  versionMetadata: PropVersionMetadata;
}) {
  return (
    <Translate
      id="theme.docs.versions.unreleasedVersionLabel"
      description="The label used to tell the user that he's browsing an unreleased doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}>
      {
        'This is the unreleased documentation for {siteTitle}, version {versionLabel}.'
      }
    </Translate>
  );
}
function UnmaintainedVersionLabel({
  siteTitle,
  versionMetadata,
}: {
  siteTitle: string;
  versionMetadata: PropVersionMetadata;
}) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabel"
      description="The label used to tell the user that he's browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}>
      {
        'This is the documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.'
      }
    </Translate>
  );
}
const BannerLabelComponents = {
  unreleased: UnreleasedVersionLabel,
  unmaintained: UnmaintainedVersionLabel,
};
function BannerLabel(props: {
  versionMetadata: PropVersionMetadata;
  siteTitle: string;
}) {
  const BannerLabelComponent =
    BannerLabelComponents[
      props.versionMetadata.banner as 'unreleased' | 'unmaintained'
    ];
  return <BannerLabelComponent {...props} />;
}
function LatestVersionSuggestionLabel({
  versionLabel,
  to,
  onClick,
}: {
  versionLabel: string;
  to: string;
  onClick: () => void;
}) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        versionLabel,
        latestVersionLink: (
          <b>
            <Link to={to} onClick={onClick}>
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label">
                latest version
              </Translate>
            </Link>
          </b>
        ),
      }}>
      {
        'For up-to-date documentation, refer to the {latestVersionLink} ({versionLabel}).'
      }
    </Translate>
  );
}
function DocVersionBannerEnabled({
  className,
  versionMetadata,
}: {
  className: string;
  versionMetadata: PropVersionMetadata;
}) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { pluginId } = useActivePlugin({ failfast: true })!;
  const getVersionMainDoc = (version: any) =>
    version.docs.find((doc: any) => doc.id === version.mainDocId);
  const { savePreferredVersionName } = useDocsPreferredVersion(pluginId);
  const { latestDocSuggestion, latestVersionSuggestion } =
    useDocVersionSuggestions(pluginId);
  // Try to link to same doc in latest version (not always possible), falling
  // back to main doc of latest version
  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);
  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBanner,
        styles.admonition,
        'alert alert--warning margin-bottom--md'
      )}
      role="alert">
      <div>
        <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
      </div>
      <div className="margin-top--md">
        <LatestVersionSuggestionLabel
          versionLabel={latestVersionSuggestion.label}
          to={latestVersionSuggestedDoc.path}
          onClick={() => savePreferredVersionName(latestVersionSuggestion.name)}
        />
      </div>
    </div>
  );
}
export function DocVersionBanner({ className }: { className: string }) {
  const versionMetadata = useDocsVersion();
  if (versionMetadata.banner) {
    return (
      <DocVersionBannerEnabled
        className={className}
        versionMetadata={versionMetadata}
      />
    );
  }
  return null;
}

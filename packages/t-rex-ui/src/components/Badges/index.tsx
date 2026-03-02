import React from 'react';

import styles from './styles.module.css';
import clsx from 'clsx';

type BadgesProps = {
  platforms?: Platform[];
  version?: string;
  children?: React.ReactNode;
  reverse?: boolean;
};

type Platform = 'android' | 'ios' | 'web';

type PlatformBadgeProps = {
  platform: Platform;
};

type VersionBadgeProps = {
  version: string;
};

const platformNameMap: Record<Platform, string> = {
  android: 'Android',
  ios: 'iOS',
  web: 'Web',
};

export function VersionBadge({ version }: VersionBadgeProps) {
  return (
    <div className={clsx(styles.badge, styles.versionBadge)}>
      Available from {version}
    </div>
  );
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  return (
    <div className={clsx(styles.badge, styles.platformBadge)}>
      {platformNameMap[platform]}
    </div>
  );
}

export function Badges({ platforms, version, children, reverse }: BadgesProps) {
  return (
    <div className={clsx(styles.headerWithBadges, reverse && styles.headerWithBadgesReversed)}>
      {children}

      {platforms
        ?.sort()
        .map((platform) => (
          <PlatformBadge key={platform} platform={platform} />
        ))}

      {version && <VersionBadge version={version} />}
    </div>
  );
}

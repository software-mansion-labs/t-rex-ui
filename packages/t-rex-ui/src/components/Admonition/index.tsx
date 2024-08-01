import React, { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

import { ThemeClassNames } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';

import { ThemedImage } from '../ThemedImage';
import styles from './styles.module.css';
import Danger from '../../assets/danger.svg';
import DangerDark from '../../assets/danger-dark.svg';

type AdmonitionType = 'secondary' | 'important' | 'success' | 'warning';
type AdmonitionAliases = 'note' | 'info' | 'tip' | 'danger';

interface AdmonitionConfig {
  infimaClassName: string;
  label: React.ReactElement;
}

interface AdmonitionConfigsType {
  [key: string]: AdmonitionConfig;
}

interface AdmonitionProps extends PropsWithChildren {
  title: string;
  type: AdmonitionAliases;
}

const aliases: Record<AdmonitionType, AdmonitionAliases> = {
  secondary: 'note',
  important: 'info',
  success: 'tip',
  warning: 'danger',
};

const AdmonitionConfigs: AdmonitionConfigsType = {
  note: {
    infimaClassName: 'secondary',
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)">
        note
      </Translate>
    ),
  },
  tip: {
    infimaClassName: 'success',
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Tip admonition (:::tip)">
        tip
      </Translate>
    ),
  },
  danger: {
    infimaClassName: 'danger',
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)">
        danger
      </Translate>
    ),
  },
  info: {
    infimaClassName: 'info',
    label: (
      <Translate
        id="theme.admonition.info"
        description="The default label used for the Info admonition (:::info)">
        info
      </Translate>
    ),
  },
  caution: {
    infimaClassName: 'caution',
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)">
        caution
      </Translate>
    ),
  },
};
// Legacy aliases, undocumented but kept for retro-compatibility

export function Admonition(props: AdmonitionProps) {
  const { children, type, title } = processAdmonitionProps(props);
  const typeConfig = getAdmonitionConfig(type);
  const titleLabel = title ?? typeConfig.label;

  const dangerIcon = {
    light: Danger as unknown as string,
    dark: DangerDark as unknown as string,
  };

  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
        styles.admonition,
        'alert',
        styles[`alert--${typeConfig.infimaClassName}`]
      )}>
      <div className={styles.admonitionHeading}>
        <div className={styles.admonitionIcon}>
          <ThemedImage sources={dangerIcon} />
        </div>

        {titleLabel}
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  );

  function getAdmonitionConfig(
    unsafeType: AdmonitionAliases
  ): AdmonitionConfig {
    const type =
      aliases[unsafeType as keyof Record<AdmonitionType, AdmonitionAliases>] ??
      unsafeType;
    const config = AdmonitionConfigs[type];
    if (config) {
      return config;
    }
    console.warn(
      `No admonition config found for admonition type "${type}". Using Info as fallback.`
    );
    return AdmonitionConfigs.info;
  }
}

// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children: ReactNode | ReactNode[]) {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) =>
      React.isValidElement(item) && item.props?.mdxType === 'mdxAdmonitionTitle'
  );
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>;
  return {
    mdxAdmonitionTitle,
    rest,
  };
}

function processAdmonitionProps(props: AdmonitionProps): AdmonitionProps {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(
    props.children
  );
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  };
}

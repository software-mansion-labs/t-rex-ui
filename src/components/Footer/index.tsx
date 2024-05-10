import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import FooterLinks from './Links';
import FooterLogo from './Logo';
import FooterCopyright from './Copyright';
import FooterLayout from './Layout';

const Footer = React.memo(function Footer() {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;
  return (
    <FooterLayout
      style={style}
      links={links && links.length > 0 && <FooterLinks links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
});

export { Footer };

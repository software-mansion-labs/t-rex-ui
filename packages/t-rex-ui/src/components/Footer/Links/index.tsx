import { isMultiColumnFooterLinks } from '@docusaurus/theme-common';
import FooterLinksMultiColumn from '../Links/MultiColumn';
import FooterLinksSimple from '../Links/Simple';
import type { FooterLinkItem } from '@docusaurus/theme-common';

export default function FooterLinks({
  links,
}: {
  links: { title: string | null; items: FooterLinkItem[] }[] | FooterLinkItem[];
}) {
  return isMultiColumnFooterLinks(links) ? (
    <FooterLinksMultiColumn columns={links} />
  ) : (
    <FooterLinksSimple links={links} />
  );
}

import { isMultiColumnFooterLinks } from '@docusaurus/theme-common';
import FooterLinksMultiColumn from './MultiColumn';
import FooterLinksSimple from './Simple';
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

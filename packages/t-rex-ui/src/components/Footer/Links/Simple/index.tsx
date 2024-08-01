import React from 'react';
import LinkItem from '../../LinkItem';
import type { FooterLinkItem } from '@docusaurus/theme-common';
import type { MultiColumnFooter, SimpleFooter } from '@docusaurus/theme-common';

function Separator() {
  return <span className="footer__link-separator">·</span>;
}
function SimpleLinkItem({ item }: { item: FooterLinkItem }) {
  return item.html ? (
    <span
      className="footer__link-item"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <LinkItem item={item} />
  );
}
export default function FooterLinksSimple({
  links,
}: {
  links: MultiColumnFooter['links'] | SimpleFooter['links'];
}) {
  return (
    <div className="footer__links text--center">
      <div className="footer__links">
        {links.map((item: any, i: number) => (
          <React.Fragment key={i}>
            <SimpleLinkItem item={item} />
            {links.length !== i + 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

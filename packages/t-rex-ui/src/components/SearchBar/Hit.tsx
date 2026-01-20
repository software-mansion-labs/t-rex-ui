import { PropsWithChildren } from 'react';
import Link from '@docusaurus/Link';
import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react';

export { Hit };

function Hit({
  hit,
  children,
}: PropsWithChildren<{
  hit: InternalDocSearchHit | StoredDocSearchHit;
}>) {
  return <Link to={hit.url}>{children}</Link>;
}

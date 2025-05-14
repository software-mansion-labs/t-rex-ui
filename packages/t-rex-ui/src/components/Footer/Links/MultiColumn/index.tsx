import LinkItem from '../../LinkItem';
import type { FooterLinkItem } from '@docusaurus/theme-common';

function ColumnLinkItem({ item }: { item: FooterLinkItem }) {
  return item.html ? (
    <li
      className="footer__item"
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li key={item.href ?? item.to} className="footer__item">
      <LinkItem item={item} />
    </li>
  );
}

function Column({
  column,
}: {
  column: { title: string | null; items: FooterLinkItem[] };
}) {
  return (
    <div className="col footer__col">
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item: any, i: number) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}
export default function FooterLinksMultiColumn({
  columns,
}: {
  columns: { title: string | null; items: FooterLinkItem[] }[];
}) {
  return (
    <div className="row footer__links">
      {columns.map(
        (
          column: {
            title: string | null;
            items: FooterLinkItem[];
          },
          i: number
        ) => (
          <Column key={i} column={column} />
        )
      )}
    </div>
  );
}

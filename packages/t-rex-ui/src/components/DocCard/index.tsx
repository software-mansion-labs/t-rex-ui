import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import Heading from '../Heading';

import type {
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import { ThemedImage } from '../ThemedImage';
import styles from './styles.module.css';
import Card from '../../assets/card-icon.svg';
import CardDark from '../../assets/card-icon-dark.svg';

function CardContainer({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer)}>
      {children}
    </Link>
  );
}
function CardLayout({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const cardIcons = {
    light: Card as unknown as string,
    dark: CardDark as unknown as string,
  };

  return (
    <CardContainer href={href}>
      <div className={styles.cardIconWrapper}>
        <ThemedImage sources={cardIcons} className={styles.cardIcon} />
      </div>
      <div className={styles.cardLabels}>
        <Heading
          as="h2"
          className={clsx('text--truncate', styles.cardTitle)}
          title={title}>
          {title}
        </Heading>
        {description && (
          <p
            className={clsx('text--truncate', styles.cardDescription)}
            title={description}>
            {description}
          </p>
        )}
      </div>
    </CardContainer>
  );
}
function CardCategory({ item }: { item: PropSidebarItemCategory }) {
  const href = findFirstSidebarItemLink(item);
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      href={href}
      title={item.label}
      description={
        item.description ??
        translate(
          {
            message: '{count} items',
            id: 'theme.docs.DocCard.categoryDescription',
            description:
              'The default description for a category card in the generated index about how many items this category includes',
          },
          { count: item.items.length }
        )
      }
    />
  );
}
function CardLink({ item }: { item: PropSidebarItemLink }) {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      title={item.label}
      description={item.description ?? doc?.description ?? ''}
    />
  );
}
export function DocCard({ item }: { item: PropSidebarItem }) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

import { ThemedImage } from '../ThemedImage';

import ArrowRight from '../../assets/arrow-right.svg';
import ArrowRightDark from '../../assets/arrow-right-dark.svg';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowLeftDark from '../../assets/arrow-left-dark.svg';

interface PaginatorNavLinkProps {
  permalink: string;
  title: string;
  subLabel: string;
  isNext: boolean;
}

export function PaginatorNavLink(props: PaginatorNavLinkProps) {
  const { permalink, title, subLabel, isNext } = props;

  const rightArrow = {
    light: ArrowRight as unknown as string,
    dark: ArrowRightDark as unknown as string,
  };

  const leftArrow = {
    light: ArrowLeft as unknown as string,
    dark: ArrowLeftDark as unknown as string,
  };

  return (
    <Link
      className={clsx(
        styles.pagination,
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev'
      )}
      to={permalink}>
      Dziala
      {subLabel && (
        <div
          className={clsx(
            styles.paginationSublabel,
            isNext ? styles.paginationNext : styles.paginationPrevious
          )}>
          <div className={styles.paginationArrow}>
            <ThemedImage sources={isNext ? rightArrow : leftArrow} />
          </div>
          <div className="pagination-nav__sublabel">{subLabel}</div>
        </div>
      )}
      <div className="pagination-nav__label">{title}</div>
    </Link>
  );
}

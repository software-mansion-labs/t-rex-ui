import clsx from 'clsx';
import styles from './styles.module.css';
import { ThemedImage } from '../../ThemedImage';
import Brand from '../../../assets/brand.svg';
import BrandDark from '../../../assets/brand-dark.svg';

import usePageType from '../../../hooks/usePageType';

const BRAND_LINK = 'https://swmansion.com/';

export default function FooterCopyright({ copyright }: { copyright: string }) {
  const { isDocumentation } = usePageType();

  const brandLogo = {
    light: Brand as unknown as string,
    dark: BrandDark as unknown as string,
  };

  return (
    <div className={clsx('footer__copyright', styles.footer)}>
      {
        <a href={BRAND_LINK} target="_blank">
          <div className={styles.footer__logo}>
            <ThemedImage sources={brandLogo} />
          </div>
        </a>
      }
      <p className={clsx(!isDocumentation && styles.landing)}>
        <span className={styles.footer__brand}>
          &copy;{' '}
          <a href={BRAND_LINK} target="_blank">
            Software Mansion
          </a>
          {' ' + new Date().getFullYear()}.
        </span>
        {` ${copyright}`}
      </p>
    </div>
  );
}

import clsx from 'clsx';
import styles from './styles.module.css';

import usePageType from '../../../hooks/usePageType';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: {
  style: 'dark' | 'light';
  links: JSX.Element | boolean;
  logo?: JSX.Element;
  copyright?: JSX.Element | '';
}) {
  const { isLanding } = usePageType();

  return (
    <footer
      className={clsx('footer', isLanding && styles.footerLanding, {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}

import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig, type NavbarLogo } from '@docusaurus/theme-common';
import { ThemedImage } from '../ThemedImage';
import type { LogoWrapperProps } from './index';
import styles from './styles.module.css';
import usePageType from '../../hooks/usePageType';

const getWrappedImage = (image: React.JSX.Element, className?: string) => {
  return className ? <div className={className}>{image}</div> : image;
};

const LogoThemedImage = ({
  logo,
  alt,
  imageClassName,
}: {
  logo: NavbarLogo;
  alt: string;
  imageClassName?: string;
}) => {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );

  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  return getWrappedImage(themedImage, imageClassName);
};

const LogoStyling = (props: LogoWrapperProps): React.JSX.Element => {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { isLanding } = usePageType();
  const {
    titleImages,
    heroImages,
    imageClassName,
    titleClassName,
    useLandingLogoDualVariant,
    ...propsRest
  } = props;
  const logoLink = useBaseUrl(logo?.href || '/');

  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? '' : title;

  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;

  const HeroLogo: NavbarLogo = {
    src: heroImages?.logo ?? '',
  };

  const titleImage = {
    docs: <ThemedImage sources={titleImages} />,
    hero: (
      <ThemedImage
        sources={{
          light: heroImages?.title ?? '',
          dark: heroImages?.title ?? '',
        }}
      />
    ),
  };

  return (
    <Link
      to={logoLink}
      className={styles.link}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}>
      {logo && (!isLanding || useLandingLogoDualVariant) ? (
        <>
          <LogoThemedImage
            logo={logo}
            alt={alt}
            imageClassName={imageClassName}
          />
        </>
      ) : (
        <LogoThemedImage
          logo={HeroLogo}
          alt={alt}
          imageClassName={imageClassName}
        />
      )}
      {titleImages && !isLanding
        ? getWrappedImage(titleImage.docs, titleClassName)
        : heroImages?.title
          ? getWrappedImage(titleImage.hero, titleClassName)
          : getWrappedImage(titleImage.docs, titleClassName)}
    </Link>
  );
};

export default LogoStyling;

import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Navbar } from '@swmansion/t-rex-ui';

export default function NavbarWrapper(props) {
  const heroImages = {
    logo: useBaseUrl('/img/logo.svg'),
  };
  console.log(heroImages);
  return (
    <>
      <Navbar heroImages={heroImages} {...props} />
    </>
  );
}

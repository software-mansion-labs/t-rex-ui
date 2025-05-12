import { type ComponentProps } from 'react';
import Head from '@docusaurus/Head';
import MDXCode from './Code';
import MDXA from './A';
import MDXPre from './Pre';
import { MDXDetails } from './Details';
import MDXHeading from './Heading';
import MDXUl from './Ul';
import MDXLi from './Li';
import MDXImg from './Img';
import { Admonition } from '../Admonition';
import Mermaid from '../Mermaid';

export const MDXComponents = {
  Head,
  details: MDXDetails, // For MD mode support, see https://github.com/facebook/docusaurus/issues/9092#issuecomment-1602902274
  Details: MDXDetails,
  code: MDXCode,
  a: MDXA,
  pre: MDXPre,
  ul: MDXUl,
  li: MDXLi,
  img: MDXImg,
  h1: (props: ComponentProps<'h1'>) => <MDXHeading as="h1" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <MDXHeading as="h2" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <MDXHeading as="h3" {...props} />,
  h4: (props: ComponentProps<'h4'>) => <MDXHeading as="h4" {...props} />,
  h5: (props: ComponentProps<'h5'>) => <MDXHeading as="h5" {...props} />,
  h6: (props: ComponentProps<'h6'>) => <MDXHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: Mermaid,
};

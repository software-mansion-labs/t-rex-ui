import type { ComponentProps, ReactNode } from 'react';
import React from 'react';
import CodeBlock from '../CodeBlock';
import CodeInline from '../CodeBlock';

function shouldBeInline(props: any) {
  return (
    // empty code blocks have no props.children,
    // see https://github.com/facebook/docusaurus/pull/9704
    typeof props.children !== 'undefined' &&
    React.Children.toArray(props.children).every(
      (el) => typeof el === 'string' && !el.includes('\n')
    )
  );
}

export default function MDXCode(props: any): ReactNode {
  return shouldBeInline(props) ? (
    <CodeInline {...props} />
  ) : (
    <CodeBlock {...(props as ComponentProps<typeof CodeBlock>)} />
  );
}

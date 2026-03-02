import {type ReactNode} from 'react';

// Simple component used to render inline code blocks
// its purpose is to be swizzled and customized
// MDX 1 used to have a inlineCode comp, see https://mdxjs.com/migrating/v2/
export default function CodeInline(props: any): ReactNode {
  return <code {...props} />;
}

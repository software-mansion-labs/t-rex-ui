import React, {
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';
import Details from '../Details';

export function MDXDetails(props: any): ReactNode {
  const items = React.Children.toArray(props.children);
  // Split summary item from the rest to pass it as a separate prop to the
  // Details theme component
  const summary = items.find(
    (item): item is ReactElement<ComponentProps<'summary'>> =>
      React.isValidElement(item) && item.type === 'summary'
  );
  const children = <>{items.filter((item) => item !== summary)}</>;

  return (
    <Details {...props} summary={summary}>
      {children}
    </Details>
  );
}

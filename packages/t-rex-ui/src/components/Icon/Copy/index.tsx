import { type ReactNode } from 'react';
import { IconProps } from '../types';

export default function IconCopy(props: IconProps): ReactNode {
  const width = props.size || 16;
  const height = props.size || 16;
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} {...props}>
      <path
        fill="currentColor"
        d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
      />
    </svg>
  );
}

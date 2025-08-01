import { type ReactNode } from 'react';
import { IconProps } from '../Close';

export default function IconSuccess(props: IconProps): ReactNode {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
      />
    </svg>
  );
}

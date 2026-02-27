
import { type ReactNode } from 'react';
import { IconProps } from '../types';

export default function IconChevron(props: IconProps): ReactNode {
  const width = props.size || 16;
  const height = props.size || 16;
  return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
  )}
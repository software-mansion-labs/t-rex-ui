import { IconProps } from '../types';

function ArrowRight(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10"
      fill="none"
      viewBox="0 0 13 10"
      {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.687 5h-10M7.687 9l4-4-4-4"></path>
    </svg>
  );
}

export default ArrowRight;

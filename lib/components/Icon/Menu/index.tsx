interface IconProps {
  width?: number
  height?: number
  className?: string
  restProps?: any
}

export default function IconMenu({
  width = 30,
  height = 30,
  className,
  ...restProps
}: IconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 30 30'
      aria-hidden='true'
      {...restProps}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        d='M4 7h22M4 15h22M4 23h22'
      />
    </svg>
  )
}

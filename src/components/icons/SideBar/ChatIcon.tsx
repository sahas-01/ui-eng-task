import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillOpacity={0.1}
      d="M18.125 11.875v5.156a.469.469 0 0 1-.469.469H12.5a5.625 5.625 0 0 1-5.305-3.75H7.5a5.625 5.625 0 0 0 5.307-7.49 5.625 5.625 0 0 1 5.318 5.615Z"
    />
    <path
      fill="currentColor"
      d="M13.248 5.671A6.25 6.25 0 0 0 1.25 8.125v5.156a1.094 1.094 0 0 0 1.094 1.094H6.77a6.262 6.262 0 0 0 5.729 3.75h5.156a1.094 1.094 0 0 0 1.094-1.094v-5.156a6.25 6.25 0 0 0-5.502-6.204ZM2.5 8.125a5 5 0 1 1 5 5h-5v-5Zm15 8.75h-5a5.01 5.01 0 0 1-4.35-2.534 6.244 6.244 0 0 0 5.498-7.332 5 5 0 0 1 3.852 4.866v5Z"
    />
  </svg>
)
export { SvgComponent as ChatIcon }

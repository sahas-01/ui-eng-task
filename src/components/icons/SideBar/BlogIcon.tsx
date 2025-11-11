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
      d="M6.25 3.125v13.75h-2.5a.625.625 0 0 1-.625-.625V3.75a.625.625 0 0 1 .625-.625h2.5Z"
    />
    <path
      fill="currentColor"
      d="M14.375 8.75a.625.625 0 0 1-.625.625h-5a.625.625 0 0 1 0-1.25h5a.625.625 0 0 1 .625.625Zm-.625 1.875h-5a.625.625 0 1 0 0 1.25h5a.624.624 0 1 0 0-1.25ZM17.5 3.75v12.5a1.25 1.25 0 0 1-1.25 1.25H3.75a1.25 1.25 0 0 1-1.25-1.25V3.75A1.25 1.25 0 0 1 3.75 2.5h12.5a1.25 1.25 0 0 1 1.25 1.25ZM3.75 16.25h1.875V3.75H3.75v12.5Zm12.5 0V3.75H6.875v12.5h9.375Z"
    />
  </svg>
)
export { SvgComponent as BlogIcon }

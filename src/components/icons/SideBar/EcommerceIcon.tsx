import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15 0H1.25A1.25 1.25 0 0 0 0 1.25V12.5a1.25 1.25 0 0 0 1.25 1.25H15a1.25 1.25 0 0 0 1.25-1.25V1.25A1.25 1.25 0 0 0 15 0Zm0 1.25V2.5H1.25V1.25H15Zm0 11.25H1.25V3.75H15v8.75Zm-3.125-6.875a3.75 3.75 0 0 1-7.5 0 .625.625 0 0 1 1.25 0 2.5 2.5 0 1 0 5 0 .625.625 0 1 1 1.25 0Z"
    />
  </svg>
)
export { SvgComponent as EcommerceIcon }

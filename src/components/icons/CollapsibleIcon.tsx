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
      d="M15 0H1.25A1.25 1.25 0 0 0 0 1.25V12.5a1.25 1.25 0 0 0 1.25 1.25H15a1.25 1.25 0 0 0 1.25-1.25V1.25A1.25 1.25 0 0 0 15 0ZM1.25 8.75H2.5a.625.625 0 0 0 0-1.25H1.25V6.25H2.5A.625.625 0 0 0 2.5 5H1.25V3.75H2.5a.625.625 0 0 0 0-1.25H1.25V1.25h3.125V12.5H1.25V8.75ZM15 12.5H5.625V1.25H15V12.5Z"
    />
  </svg>
)
export { SvgComponent as CollapsibleIcon }

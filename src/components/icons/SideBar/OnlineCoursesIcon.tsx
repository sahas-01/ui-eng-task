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
      d="M18.125 5v10a.624.624 0 0 1-.625.625h-5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0-2.5-2.5h-5A.625.625 0 0 1 1.875 15V5a.625.625 0 0 1 .625-.625h5a2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1 2.5-2.5h5a.625.625 0 0 1 .625.625Z"
    />
    <path
      fill="currentColor"
      d="M17.5 3.75h-5A3.125 3.125 0 0 0 10 5a3.125 3.125 0 0 0-2.5-1.25h-5A1.25 1.25 0 0 0 1.25 5v10a1.25 1.25 0 0 0 1.25 1.25h5a1.875 1.875 0 0 1 1.875 1.875.625.625 0 1 0 1.25 0A1.875 1.875 0 0 1 12.5 16.25h5A1.25 1.25 0 0 0 18.75 15V5a1.25 1.25 0 0 0-1.25-1.25ZM7.5 15h-5V5h5a1.875 1.875 0 0 1 1.875 1.875v8.75A3.11 3.11 0 0 0 7.5 15Zm10 0h-5a3.11 3.11 0 0 0-1.875.625v-8.75A1.875 1.875 0 0 1 12.5 5h5v10Z"
    />
  </svg>
)
export { SvgComponent as OnlineCoursesIcon }

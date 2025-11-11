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
      d="M15 1.875H8.334L6.166.25a1.26 1.26 0 0 0-.75-.25H1.25A1.25 1.25 0 0 0 0 1.25v10.625a1.25 1.25 0 0 0 1.25 1.25H15a1.25 1.25 0 0 0 1.25-1.25v-8.75A1.25 1.25 0 0 0 15 1.875ZM1.25 1.25h4.166L7.084 2.5 5.416 3.75H1.25v-2.5ZM15 11.875H1.25V5h4.166c.27 0 .534-.088.75-.25l2.168-1.625H15v8.75Z"
    />
  </svg>
)
export { SvgComponent as ProjectsIcon }

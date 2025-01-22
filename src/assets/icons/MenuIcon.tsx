import { FC, SVGProps } from "react";
export const MenuIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M3 5a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2H3ZM3 9a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2H3ZM2 14a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 17a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z"
      fill="currentColor"
    />
  </svg>
);

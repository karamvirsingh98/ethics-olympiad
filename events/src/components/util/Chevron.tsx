import { useTheme } from "../../App";

export default function Chevron({ up }: { up: boolean }) {
  const { dark } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={dark ? "#f8f4e3" : "#262726"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={`rotate(${up ? "0" : "-90"})`}
      style={{ transition: ".2s ease"}}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

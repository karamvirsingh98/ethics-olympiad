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
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      transform={`rotate(${up ? "180deg" : "0deg"})`}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

export default function DarkIcon({
  dark,
  toggle,
}: {
  dark: boolean;
  toggle: () => void;
}) {
  return (
    <button
      style={{
        position: "absolute",
        top: "1rem",
        right: "2rem",
        display: "grid",
        placeItems: "center",
        width: "1.5rem",
        height: "1.5rem",
        zIndex: 1000,
      }}
      onClick={toggle}
    >
      <svg
        version="1.1"
        id="dark_icon"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 500.345 500.345"
        enableBackground="new 0 0 500.345 500.345"
        width="1.5rem"
        height="1.5rem"
        className="dark-icon"
      >
        <g>
          <path
            fill={dark ? "#F0E2A3" : "#262726"}
            d="M250.197,128.078c-57.517,0-104.093,46.626-104.093,104.108c0,27.267,10.493,58.861,27.658,84.518
		c18.556,27.774,31.28,59.401,36.94,92.321l2.653,15.51h73.648l2.668-15.576c5.727-33.169,18.237-64.234,36.941-92.225
		c17.164-25.672,27.672-57.268,27.672-84.549C354.285,174.704,307.693,128.078,250.197,128.078z"
          />
          <path
            fill={dark ? "#F8F4E3" : "#262726"}
            d="M213.865,464.032c0,20.049,16.264,36.313,36.313,36.313c20.054,0,36.303-16.248,36.303-36.297v-15.164h-72.615V464.032z"
          />
        </g>
      </svg>
    </button>
  );
}

import { useState } from "react";

export default function Topbar({toggleDark}:{toggleDark: () => void}) {
  const [current, set] = useState(0);

  return (
    <div className="topbar">
      {TOPBAR_BUTTONS.map((text, i) => (
        <TopbarButton key={text+i} text={text} active={i === current} onClick={() => set(i)} />
      ))}
      <button className="topbar-button" onClick={toggleDark}>Dark</button>
    </div>
  );
}

const TOPBAR_BUTTONS = ["Home", "Events", "Cases"];

function TopbarButton({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`topbar-button${active ? "-active" : ""}`} onClick={onClick}>
      {text}
    </button>
  );
}

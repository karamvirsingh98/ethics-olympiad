import { useState } from "react";
import DarkIcon from "./util/DarkIcon";

export default function Topbar({dark, toggleDark, logout}:{dark: boolean, toggleDark: () => void, logout: () => void}) {
  const [current, set] = useState(0);

  return (
    <div className="topbar">
      {TOPBAR_BUTTONS.map((text, i) => (
        <TopbarButton key={text+i} text={text} active={i === current} onClick={() => set(i)} />
      ))}
      <button onClick={toggleDark}><DarkIcon dark={dark}  /></button>
      <button className="red" onClick={() => logout()}> Logout</button> 
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
    <button style={{ borderRadius: 0 }} className={`topbar-button${active ? "-active" : ""}`} onClick={onClick}>
      {text}
    </button>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../state/types";
import DarkIcon from "./util/DarkIcon";

export default function Topbar({
  dark,
  user,
  toggleDark,
  logout,
}: {
  dark: boolean;
  user: User
  toggleDark: () => void;
  logout: () => void;
}) {
  const [current, set] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="topbar">
      {TOPBAR_BUTTONS.map((text, i) => (
        <TopbarButton
          key={text + i}
          text={text}
          active={i === current}
          onClick={() => {
            set(i);
            navigate(text === "Home" ? "/" : `/${text.toLowerCase()}`);
          }}
        />
      ))}
      {user.admin && (
        <TopbarButton
          text="Users"
          active={current === 3}
          onClick={() => {
            set(3);
            navigate('/users');
          }}
        />
      )}
      <button onClick={toggleDark}>
        <DarkIcon dark={dark} />
      </button>
      <button className="red" onClick={() => logout()}>
        Logout
      </button>
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
    <button
      style={{ borderRadius: 0 }}
      className={`topbar-button${active ? "-active" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

import { User } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkIcon from "./util/DarkIcon";

export default function Topbar({
  dark,
  user,
  toggleDark,
  logout,
}: {
  dark: boolean;
  user: User;
  toggleDark: () => void;
  logout: () => void;
}) {
  const [current, set] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = window.location.pathname;
    console.log(pathName.split("/")[0]);
    const index =
      pathName === "/"
        ? 0
        : [...TOPBAR_BUTTONS, "Users"].findIndex(
            (t) => t.toLowerCase() === pathName.slice(1, pathName.length)
          );
    set(index);
  }, [window.location.pathname]);

  return (
    <div className="topbar" style={{ width: "100%" }}>
      <div style={{ fontSize: "2rem" }}>Ethics Olympiad Manager</div>
      <div className="topbar-buttons">
        {TOPBAR_BUTTONS.map((text, i) => (
          <TopbarButton
            key={i}
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
              navigate("/users");
            }}
          />
        )}
        <button onClick={toggleDark}>
          <DarkIcon dark={dark} />
        </button>
        <button
          className="red"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
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
      className={`topbar-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

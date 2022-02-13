import { useState } from "react";
import { client } from "../..";
import { Olympaid } from "../../state/types";
import IfElse from "../util/IfElse";
import AdminLogin from "./AdminLogin";
import JudgeLogin from "./JudgeLogin";

export default function Unlock({
  eventID,
  unlock,
  onUnlock,
  login,
  onLogin,
}: {
  eventID: string;
  unlock: (eventID: string, password: string) => void;
  onUnlock: (olympiad: Olympaid) => void;
  login: (credentials: { email: string; password: string }) => void;
  onLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const doUnlock = async () => {
    try {
      await client
        .service("api/unlock")
        .create({ id: eventID, password })
        .then((olympiad: Olympaid) => {
          unlock(eventID, password);
          onUnlock(olympiad);
        });
    } catch {
      window.alert("Invalid Password.");
    }
  };

  return (
    <div className="auth-window">
      <div
        style={{ fontSize: "2rem", borderBottom: "solid 1px", width: "100%" }}
      >
        Login as {admin ? "Admin" : "Judge"}
      </div>
      <IfElse
        showIf={admin}
        showTrue={
          <AdminLogin
            username={email}
            password={password}
            setUsername={setEmail}
            setPassword={setPassword}
          />
        }
        showFalse={<JudgeLogin password={password} set={setPassword} />}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button
          className="green"
          onClick={() => {
            if (admin) login({ email, password });
            else doUnlock();
          }}
        >
          Login
        </button>
        <button
          className="blue"
          onClick={() => setAdmin(!admin)}
          style={{ fontSize: "0.8rem" }}
        >
          Login as {admin ? 'Judge' : 'Admin'}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { client } from "../..";
import { Olympaid } from "../../state/types";
import Input from "../util/Input";

export default function Unlock({
  eventID,
  unlock,
  onUnlock,
}: {
  eventID: string;
  unlock: (eventID: string, password: string) => void;
  onUnlock: (olympiad: Olympaid) => void;
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false)

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
        Login as {admin ? 'Admin' : 'Judge'}
      </div>
      <JudgeLogin password={password} set={setPassword} />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <button className="green" onClick={doUnlock}>
          Login
        </button>
        <button className="blue" onClick={() => setAdmin(!admin)} style={{ fontSize: '0.8rem' }}>
          Login as Admin
        </button>
      </div>
    </div>
  );
}

function AdminLogin() {
  return (
    <div>

    </div>
  )
}

function JudgeLogin({ password, set }: { password: string, set: (p: string) => void}) {
  const [show, setShow] = useState(false)

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        width: "100%",
        gap: "1rem",
      }}
    >
      <Input
        type={show ? undefined : "password"}
        placeholder="password"
        value={password}
        onChange={set}
        // onConfirm={doUnlock}
      />
      <button
        className={show ? "blue" : "orange"}
        style={{ fontSize: "0.8rem", placeSelf: "end", width: "3rem" }}
        onClick={() => setShow((s) => !s)}
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
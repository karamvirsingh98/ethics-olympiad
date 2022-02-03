import axios from "axios";
import { useState } from "react";
import { Event } from "../../state/types";
import Input from "../util/Input";

export default function Unlock({ eventID, onUnlock }: { eventID: string, onUnlock: (event: Event) => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const unlock = async () => {
    const res = await axios({
      method: "post",
      url: "http://localhost:3030/api/unlock",
      data: { eventID, password }
    }).then(({ data }) => onUnlock(data));
  };


  return (
    <div className="auth-window">
      <div style={{ fontSize: "2rem", borderBottom: "solid 1px", width: "100%" }}>
        Unlock Event
      </div>
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
          onChange={setPassword}
          onConfirm={unlock}
        />
        <button
          className={show ? "blue" : "orange"}
          style={{ fontSize: "0.8rem", placeSelf: "end", width: "3rem" }}
          onClick={() => setShow(s => !s)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <button
        className="green"
        style={{ width: "100%" }}
        onClick={unlock}
      >
        Login
      </button>
    </div>
  );
}

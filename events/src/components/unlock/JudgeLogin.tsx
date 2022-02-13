import { useState } from "react";
import Input from "../util/Input";

export default function JudgeLogin({
  password,
  set,
}: {
  password: string;
  set: (p: string) => void;
}) {
  const [show, setShow] = useState(false);

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
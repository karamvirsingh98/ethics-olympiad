import { useRef, useState } from "react";
import useJudgeName from "../../state/hooks/useJudgeName";
import IfElse from "../util/IfElse";
import Input from "../util/Input";

export default function JudgeLogin({
  password,
  set,
}: {
  password: string;
  set: (p: string) => void;
}) {
  const [show, setShow] = useState(false);
  const { name, set: setName } = useJudgeName();

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <JudgeName name={name} set={setName} />
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
    </div>
  );
}

function JudgeName({
  name,
  set,
}: {
  name: string;
  set: (name: string) => void;
}) {
  const [_name, _set] = useState(name)


  return (
    <IfElse
      showIf={name === ""}
      showTrue={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            width: "100%",
            gap: "1rem",
          }}
        >
          <Input value={_name} placeholder="Name" onChange={(name) => _set(name)} />
          <button
            style={{ fontSize: "0.8rem", placeSelf: "end", width: "3rem" }}
            className="green"
            onClick={() => set(_name)}
          >
            Save
          </button>
        </div>
      }
      showFalse={
        <div style={{ display: "flex", gap: "2rem" }}>
          Logged in as {name}
          <button
            onClick={() => set("")}
            className="orange"
            style={{
              fontSize: "0.8rem",
              placeSelf: "end",
              whiteSpace: "nowrap",
            }}
          >
            Not You? 
          </button>
        </div>
      }
    />
  );
}

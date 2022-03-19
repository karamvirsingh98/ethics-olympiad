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

  return (
    <div style={{ display: "grid", gap: "2rem" }}>
      <JudgeName />
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

function JudgeName() {
  const { judgeName, setName } = useJudgeName();

  return (
    <IfElse
      showIf={!judgeName}
      showTrue={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            width: "100%",
            gap: "1rem",
          }}
        >
          <Input
            value={judgeName || undefined}
            placeholder="Name"
            onChange={(name) => setName(name)}
          />
        </div>
      }
      showFalse={
        <div style={{ display: "flex", gap: "2rem" }}>
          Logged in as {judgeName}
          <button
            onClick={() => setName("")}
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

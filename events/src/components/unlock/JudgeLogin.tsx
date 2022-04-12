import { useRef, useState } from "react";
import useJudgeName from "../../state/hooks/useJudgeName";
import IfElse from "../util/IfElse";
import Input from "../util/Input";

export default function JudgeLogin({
  judgeName,
  setName,
  password,
  setPassword,
}: {
  judgeName: string;
  setName: (name: string) => void;
  password: string;
  setPassword: (p: string) => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ display: "grid", gap: "2rem", width: "100%" }}>
      <JudgeName {...{ judgeName, setName }} />
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
  judgeName,
  setName,
}: {
  judgeName: string;
  setName: (name: string) => void;
}) {
  return (
    <IfElse
      showIf={!judgeName}
      showTrue={
        <Input
          defaultValue={judgeName || undefined}
          placeholder="Name"
          onConfirm={(name) => {
            setName(name);
            localStorage.setItem("judge_name", name);
          }}
        />
      }
      showFalse={
        <div className="flex-between">
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

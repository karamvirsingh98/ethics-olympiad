import { useState } from "react";
import Input from "../util/Input";

export default function Login({
  login,
}: {
  login: (credentials: {email: string, password: string}) => void;
}) {
  const [credentials, set] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);

  return (
    <div className="auth-window">
      <div style={{ fontSize: "2rem", borderBottom: "solid 1px" }}>
        Ethics Olympiad Manager
      </div>
      <Input
        placeholder="email"
        value={credentials.email}
        onChange={(email) => set({ ...credentials, email })}
      />
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
          value={credentials.password}
          onChange={(password) => set({ ...credentials, password })}
          onConfirm={() => login(credentials)}
        />
        <button
          className={show ? "blue" : "orange"}
          style={{ fontSize: "0.8rem", placeSelf: "end", width: '3rem' }}
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <button
        className="green"
        style={{ width: "100%" }}
        onClick={() => login(credentials)}
      >
        Login
      </button>
    </div>
  );
}

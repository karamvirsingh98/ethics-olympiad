import { useState } from "react";
import Input from "../components/util/Input";

export default function Login({
  login,
}: {
  login: (email: string, password: string) => void;
}) {
  const [credentials, set] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);

  return (
    <div className="login">
      <div style={{ fontSize: "2rem", borderBottom: "solid 1px" }}>
        Ethics Olympiad Manager
      </div>
      <Input
        placeholder="email"
        value={credentials.username}
        onChange={(username) => set({ ...credentials, username })}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 1fr",
          width: "100%",
          gap: "1rem",
        }}
      >
        <Input
          type={show ? undefined : "password"}
          placeholder="password"
          value={credentials.password}
          onChange={(password) => set({ ...credentials, password })}
          onConfirm={() => login(credentials.username, credentials.password)}
        />
        <button
          className={show ? "blue" : "orange"}
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <button
        className="green"
        style={{ width: "100%" }}
        onClick={() => login(credentials.username, credentials.password)}
      >
        Login
      </button>
    </div>
  );
}

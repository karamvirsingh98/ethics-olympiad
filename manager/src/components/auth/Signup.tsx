import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../util/Input";

export default function Signup({
  createAccount,
}: {
  createAccount: (
    credentials: { name: string; email: string; password: string },
    inviteKey: string
  ) => Promise<void>;
}) {
  const [credentials, set] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);

  const { inviteKey } = useParams()
  const navigate = useNavigate()

  return (
    <div className="auth-window">
      <div style={{ fontSize: "2rem", borderBottom: "solid 1px" }}>
        Ethics Olympiad Manager
      </div>
      <Input
        placeholder="name"
        value={credentials.name}
        onChange={(name) => set({ ...credentials, name })}
      />
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
        />
        <button
          className={show ? "blue" : "orange"}
          style={{ fontSize: "0.8rem", placeSelf: "end", width: "3rem" }}
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <button className="green" style={{ width: "100%" }} onClick={async () => {
        await createAccount(credentials, inviteKey!)
        navigate("/")
      }}>
        Create Account
      </button>
    </div>
  );
}
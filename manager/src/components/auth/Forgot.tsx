import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../main";
import Input from "../util/Input";

export default function Forgot() {
  const [credentials, set] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const updatePassword = async () => {
    await client.service("api/forgot").create(credentials);
    navigate("/");
  };

  return (
    <div className="auth-window">
      <div className="auth-window">
        <div style={{ fontSize: "2rem", borderBottom: "solid 1px" }}>
          Ethics Olympiad Manager
        </div>
        <div style={{ fontSize: "1.25rem" }}>
          Please enter your email and a new password to recover your account.
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
          />
          <button
            className={show ? "blue" : "orange"}
            style={{ fontSize: "0.8rem", placeSelf: "end", width: "3rem" }}
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <button
          className="green"
          style={{ width: "100%" }}
          onClick={updatePassword}
        >
          Update My Password
        </button>
      </div>
    </div>
  );
}

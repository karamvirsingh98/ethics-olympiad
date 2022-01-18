import { useState } from "react";
import Input from "../components/util/Input";

export default function Login() {
  const [credentials, set] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);

  return (
    <div className="login">
      Ethcis Olympiad Manager
      <Input
        placeholder="username"
        value={credentials.username}
        onChange={(username) => set({ ...credentials, username })}
      />
      <div>
        <Input
          placeholder="password"
          value={credentials.password}
          onChange={(username) => set({ ...credentials, username })}
        />
        <button
          className={show ? "orange" : "blue"}
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

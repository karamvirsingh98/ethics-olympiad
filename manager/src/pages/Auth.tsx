import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Forgot from "../components/auth/Forgot";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

export default function Auth({
  login,
  createAccount,
}: {
  login: (credentials: {email: string, password: string}) => void;
  createAccount: (
    credentials: { name: string; email: string; password: string },
    inviteKey: string
  ) => Promise<void>;
}) {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route
          path="/signup/:inviteKey"
          element={<Signup createAccount={createAccount} />}
        />
        <Route
          path="/recover-password"
          element={<Forgot />}
        />
      </Routes>
    </Fragment>
  );
}

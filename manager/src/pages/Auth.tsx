import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
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
  ) => void;
}) {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route path="/signup/:inviteKey" element={<Signup createAccount={createAccount} />} />
      </Routes>
    </Fragment>
  );
}

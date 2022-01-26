import { Route, Routes } from "react-router-dom";
import { useAppState } from "../state/hooks/useAppState";
import { User } from "../state/types";
import Topbar from "../components/Topbar";
import Events from "../pages/Events";
import Users from "../components/users/Users";
import { Fragment } from "react";
import Cases from "../pages/Cases";

export default function PageHandler({
  user,
  logout,
  dark,
  toggleDark,
}: {
  user: User;
  logout: () => void;
  dark: boolean;
  toggleDark: () => void;
}) {
  const state = useAppState(user);

  return (
    <Fragment>
      <Topbar logout={logout} dark={dark} toggleDark={toggleDark} user={user} />
      <Routes>
        <Route path="/" element={"Hi"}></Route>
        <Route path="/events" element={<Events user={user} state={state} />} />
        <Route path='/cases' element={<Cases user={user} state={state} />} />
        {user.admin && (
          <Route path="/users" element={<Users currentUserID={user._id!} />} />
        )}
      </Routes>
    </Fragment>
  );
}

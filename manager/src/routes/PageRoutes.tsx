import { Route, Routes } from "react-router-dom";
// import { useAppState } from "../state/hooks/useAppState";
import { User } from "@ethics-olympiad/types";
import Topbar from "../components/Topbar";
import Events from "../pages/Events";
import { Fragment } from "react";
import Cases from "../pages/Cases";
import Users from "../pages/Users";

export default function PageRoutes({
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
  return (
    <Fragment>
      <Topbar logout={logout} dark={dark} toggleDark={toggleDark} user={user} />
      <Routes>
        <Route
          path="/"
          element={<div style={{ fontSize: "2rem" }}> Hello {user.name} </div>}
        />
        <Route path="/events/" element={<Events user={user} />} />
        <Route path="/cases/*" element={<Cases user={user} />} />
        {user.admin && (
          <Route path="/users" element={<Users currentUserID={user._id!} />} />
        )}
      </Routes>
    </Fragment>
  );
}

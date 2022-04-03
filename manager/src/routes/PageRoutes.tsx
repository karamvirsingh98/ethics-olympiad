import { Route, Routes } from "react-router-dom";
import { User } from "@ethics-olympiad/types";
import Topbar from "../components/Topbar";
import { Fragment } from "react";
import Cases from "../pages/Cases";
import Users from "../pages/Users";
import { TemplatesComponent } from "../pages/Templates";

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
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" />
          <Route
            path="/events/*"
            element={<TemplatesComponent user={user} />}
          />
          <Route path="/cases/*" element={<Cases user={user} />} />
          {user.admin && (
            <Route
              path="/users"
              element={<Users currentUserID={user._id!} />}
            />
          )}
        </Routes>
      </div>
    </Fragment>
  );
}

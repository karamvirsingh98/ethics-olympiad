import { Route, Routes, useNavigate } from "react-router-dom";
import { User } from "@ethics-olympiad/types";
import Topbar from "../components/Topbar";
import { Fragment } from "react";
import Cases from "../pages/Cases";
import Users from "../pages/Users";
import { TemplatesComponent } from "../pages/Templates";
import imgUrl from "../assets/hero.png";

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
  const navigate = useNavigate();

  return (
    <Fragment>
      <Topbar logout={logout} dark={dark} toggleDark={toggleDark} user={user} />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  placeItems: "center",
                  height: "100%",
                }}
              >
                <img src={imgUrl} alt="" style={{ height: "50vh" }} />
                <div
                  style={{
                    display: "grid",
                    gap: "2rem",
                    placeItems: "center",
                  }}
                >
                  <button
                    className="blue"
                    style={{ padding: "1rem", fontSize: "2rem" }}
                    onClick={() => navigate("/events")}
                  >
                    Your Events
                  </button>
                  <button
                    className="blue"
                    style={{ padding: "1rem", fontSize: "2rem" }}
                    onClick={() => navigate("/cases")}
                  >
                    Your Cases
                  </button>
                </div>
              </div>
            }
          />
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

import { useAuth } from "./state/hooks";
import Topbar from "./components/Topbar";
import { useLocalStorage } from "./util/hooks";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom"
import AuthManager from "./components/util/AuthManager";
import Login from "./components/auth/Login";

export default function App() {
  const { user, login, logout } = useAuth()
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark");

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <AuthManager
        user={user}
        isAuth={
          <Fragment>
            <Topbar dark={dark} toggleDark={() => set(!dark)} logout={logout} />
            <Routes>
              <Route path="/" element={"Hi"}></Route>
              {/* <Route path="/events" element={<Events state={state} />} /> */}
            </Routes>
          </Fragment>
        }
        notAuth={<Login login={login} />}
      />
    </div>
  );
}

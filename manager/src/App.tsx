import { useAppState } from "./state/hooks";
import Topbar from "./components/Topbar";
import { useLocalStorage } from "./util/hooks";
import Events from "./pages/Events";
import { Fragment } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom"

export default function App() {
  const state = useAppState();
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark");

  console.log(state.user)
  console.log(state.events)

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      {state.user && state.user && state.events && state.cases && (
        <Fragment>
          <Topbar
            dark={dark}
            toggleDark={() => set(!dark)}
            logout={state.logout}
          />
          <Routes>
            <Route path="/" element={"Hi"}></Route>
            <Route path="/events" element={<Events state={state} />} />
          </Routes>
        </Fragment>
      )}
      {state.user === undefined && (
        <div style={{ placeSelf: "center", fontSize: "2rem" }}>Loading...</div>
      )}
      {state.user === false && <Login login={state.login} />}
    </div>
  );
}

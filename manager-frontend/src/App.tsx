import { useAppState } from "./state/hooks";
import Topbar from "./components/Topbar";
import { useLocalStorage } from "./util/hooks";
import Events from "./pages/Events";
import { Fragment } from "react";
import Login from "./pages/Login";

export default function App() {
  const state = useAppState();
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark");

  console.log(state.user)
  console.log(state.events)

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      {state.user && state.user && state.events && state.cases && (
        <Fragment>
          <Topbar toggleDark={() => set(!dark)} logout={state.logout} />
          <Events state={state} />
        </Fragment>
      )}
      {state.user === undefined && (
        <div style={{ placeSelf: "center", fontSize: "2rem" }}>Loading...</div>
      )}
      {state.user === false && <Login login={state.login} />}
    </div>
  );
}

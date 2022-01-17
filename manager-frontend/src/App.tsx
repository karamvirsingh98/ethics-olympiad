import { useAppState } from "./state/hooks";
import Topbar from "./components/Topbar";
import { useClientWidth, useLocalStorage } from "./util/hooks";
import Events from "./pages/Events";
import { Fragment } from "react";


export default function App() {
  const state = useAppState();
  const width = useClientWidth();
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark")

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      {state.events && state.cases && (
        <Fragment>
          <Topbar toggleDark={() => set(!dark)} />
          <Events state={state} />
        </Fragment>
      )}
    </div>
  );
}

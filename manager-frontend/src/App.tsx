import { useAppState } from "./state/hooks";
import Topbar from "./components/Topbar";
import { useLocalStorage } from "./util/hooks";
import Events from "./pages/Events";


export default function App() {
  const state = useAppState();
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark")

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <Topbar toggleDark={() => set(!dark)} />
      <Events state={state} />
    </div>
  );
}

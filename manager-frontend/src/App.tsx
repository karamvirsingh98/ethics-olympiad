import { useAppState } from "./state/hooks";
import EventComponent from "./components/OlympiadEvent"
import Topbar from "./components/Topbar";
import { useLocalStorage } from "./util/hooks";


export default function App() {
  const state = useAppState();
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark")

  return (
    <div className={`app ${dark ? "dark" : null}`}>
      <Topbar toggleDark={() => set(!dark)} />
      <EventComponent />
    </div>
  );
}

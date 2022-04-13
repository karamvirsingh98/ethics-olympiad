import { Routes, Route } from "react-router-dom";
import Event from "./pages/Event";
import Home from "./pages/Home";
import DarkIcon from "./components/util/DarkIcon";
import createUseJudgeName from "./state/hooks/useJudgeName";
import createUseTheme from "./state/hooks/useTheme";

export const useJudgeName = createUseJudgeName();
export const useTheme = createUseTheme();

export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <DarkIcon dark={dark} toggle={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:eventID/*" element={<Event />} />
      </Routes>
    </div>
  );
}

import { Route, Routes } from "react-router-dom";
import { useAppState } from "../../state/hooks";
import { User } from "../../state/types";
import Topbar from "../Topbar";
import Events from "./Events";

export default function PageManager({
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
  const state = useAppState(user);

  console.log('state', state)

  return (
    <div className="page">
      <Topbar logout={logout} dark={dark} toggleDark={toggleDark} />
      <Routes>
        <Route path="/" element={"Hi"}></Route>
        <Route path="/events" element={<Events user={user} state={state} />} />
      </Routes>
    </div>
  );
}

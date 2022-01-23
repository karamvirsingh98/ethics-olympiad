import { Route, Routes } from "react-router-dom";
import { useAppState } from "../../state/hooks/useAppState";
import { User } from "../../state/types";
import Topbar from "../Topbar";
import Events from "../pages/Events";

export default function PageHandler({
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
      <Topbar logout={logout} dark={dark} toggleDark={toggleDark} user={user} />
      <Routes>
        <Route path="/" element={"Hi"}></Route>
        <Route path="/events" element={<Events user={user} state={state} />} />
        <Route path="/users" />
      </Routes>
    </div>
  );
}

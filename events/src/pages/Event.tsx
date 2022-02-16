import { Route, Routes, useParams } from "react-router-dom";
import useUnlock, { useFullEvent } from "../state/hooks/useUnlock";
import UnlockManager from "../components/util/UnlockManager";
import EventSplash from "../components/event/EventSplash";
import Heat from "../components/event/heat/Heat";
import Unlock from "../components/unlock/Unlock";
import { useEffect } from "react";
import { client } from "../main";
import useAuth from "../state/hooks/useAuth";
import { Olympiad, User } from "../state/types";
import Admin from "../components/event/Admin";
import Scores from "../components/event/scores/Scores";

export default function EventComponent() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  const { olympiad, set } = useFullEvent(eventID!);
  const { user, login, logout } = useAuth();

  useEffect(() => { client.service("api/channel").create({ eventID }) }, []);

  return (
    <UnlockManager
      unlocked={unlocked}
      notUnlocked={
        <Unlock
          eventID={eventID!}
          unlock={unlock}
          onUnlock={set}
          login={login}
        />
      }
      isUnlocked={olympiad && <OlympiadRoutes user={user} olympiad={olympiad}  />}
    />
  );
}

function OlympiadRoutes({
  user,
  olympiad,
}: {
  user: User | undefined | false;
  olympiad: Olympiad;
}) {
  return (
    <Routes>
      <Route path="/" element={<EventSplash event={olympiad.event} user={user} />} />
      <Route
        path="/heat:heatNumber/*"
        element={<Heat event={olympiad.event} cases={olympiad.cases} />}
      />
      <Route path="/scores" element={<Scores />} />
      {user && <Route path="/admin" element={<Admin event={olympiad.event} />} />}
    </Routes>
  );
}

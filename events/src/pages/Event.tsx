import { Route, Routes, useParams } from "react-router-dom";
import useUnlock, { useFullEvent } from "../state/hooks/useUnlock";
import UnlockManager from "../components/util/UnlockManager";
import EventSplash from "../components/event/EventSplash";
import Heat from "../components/event/heat/Heat";
import Unlock from "../components/unlock/Unlock";
import { useEffect } from "react";
import { client } from "..";
import useAuth from "../state/hooks/useAuth";

export default function EventComponent() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  const { olympiad, set } = useFullEvent(eventID!);
  const { user, login } = useAuth();

  useEffect(() => {
    client.service("api/channel").create({ eventID });
  }, []);

  return (
    <UnlockManager
      unlocked={unlocked}
      notUnlocked={
        <Unlock
          eventID={eventID!}
          unlock={unlock}
          onUnlock={set}
          login={login}
          onLogin={() => {}}
        />
      }
      isUnlocked={
        olympiad && (
          <Routes>
            <Route path="/" element={<EventSplash event={olympiad.event} />} />
            <Route
              path="/heat:heatNumber/*"
              element={<Heat event={olympiad.event} cases={olympiad.cases} />}
            />
            <Route path="/scores" />
            {user && <Route path="/admin" element={"Hi"} />}
          </Routes>
        )
      }
    />
  );
}

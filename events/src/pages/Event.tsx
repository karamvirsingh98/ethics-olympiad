import { Route, Routes, useParams } from "react-router-dom";
import useUnlock, { useFullEvent } from "../state/hooks/useUnlock";
import UnlockManager from "../components/util/UnlockManager";
import EventSplash from "../components/event/EventSplash";
import Heat from "../components/event/heat/Heat";
import Unlock from "../components/event/Unlock";

export default function EventComponent() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  const { olympiad, set } = useFullEvent(eventID!);

  return (
    <UnlockManager
      unlocked={unlocked}
      notUnlocked={
        <Unlock eventID={eventID!} unlock={unlock} onUnlock={set} />
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
          </Routes>
        )
      }
    />
  );
}

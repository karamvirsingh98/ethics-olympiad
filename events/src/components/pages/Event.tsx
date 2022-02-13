import { Route, Routes, useParams } from "react-router-dom";
import useUnlock, { useFullEvent } from "../../state/hooks/useUnlock";
import { Olympaid } from "../../state/types";
import UnlockManager from "../util/UnlockManager";
import EventSplash from "../event/EventSplash";
import Heat from "../event/heat/Heat";
import Unlock from "../event/Unlock";

export default function EventComponent() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  const { olympiad, set } = useFullEvent(eventID!);

  return (
    <UnlockManager
      unlocked={unlocked}
      isUnlocked={olympiad && <OlympiadRoutes olympiad={olympiad} />}
      notUnlocked={
        <Unlock eventID={eventID!} unlock={unlock} onUnlock={set} />
      }
    />
  );
}

function OlympiadRoutes({ olympiad }: { olympiad: Olympaid }) {
  const { event, cases } = olympiad;

  return (
    <Routes>
      <Route path="/" element={<EventSplash event={event} />} />
      <Route
        path="/heat:heatNumber/*"
        element={<Heat event={event} cases={cases} />}
      />
      <Route path="/scores" />
    </Routes>
  );
}
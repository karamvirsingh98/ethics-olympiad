import { useParams } from "react-router-dom";
import useUnlock, { useUnlockedEvent } from "../../state/hooks/useUnlock";
import UnlockManager from "../util/UnlockManager";
import Unlock from "./Unlock";

export default function EventComponent() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  const { cases, event, setEvent } = useUnlockedEvent(eventID!)

  console.log(event)

  return (
    <UnlockManager
      unlocked={unlocked}
      isUnlocked={<div> {event?.title} </div>}
      notUnlocked={<Unlock eventID={eventID!} unlock={unlock} onUnlock={setEvent} />}
    />
  );
}


import { useState } from "react";
import { Event } from "../../state/types";
import Topbar from "../event/Topbar";
import Teams from "./subcomponents/Teams";
import Judges from "./subcomponents/Judges";
import Divider from "../util/Divider";
import { AdminButtons } from "./subcomponents/Buttons";
import useActiveEvent from "../../state/hooks/useActiveEvent";

export default function Admin({ event }: { event: Event }) {
  const [showScores, setShowScores] = useState(false);
  const activeEvent = useActiveEvent(event._id);

  return (
    <div className="admin">
      <Topbar event={event} admin />
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <AdminButtons {...{ showScores, setShowScores, eventID: event._id }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 2fr",
            gap: "2rem",
          }}
        >
          <Teams eventID={event._id} teams={event.teams} />
          <Divider />
          {activeEvent && <Judges judges={activeEvent.status} />}
        </div>
      </div>
    </div>
  );
}

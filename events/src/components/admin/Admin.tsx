import { useState } from "react";
import { Event } from "../../state/types";
import Topbar from "../event/Topbar";
import Teams from "./subcomponents/Teams";
import Judges from "./subcomponents/Judges";
import Divider from "../util/Divider";
import { AdminButtons, StartButton } from "./subcomponents/Buttons";
import useActiveEvent from "../../state/hooks/useActiveEvent";
import IfElse from "../util/IfElse";
import { ScoreStatus } from "@ethics-olympiad/types";

export default function Admin({ event }: { event: Event }) {
  const [showScores, setShowScores] = useState(false);
  const activeEvent = useActiveEvent(event._id);

  console.log(activeEvent);

  return (
    <div className="admin">
      <Topbar event={event} admin />
      <IfElse
        showIf={activeEvent ? true : false}
        showTrue={
          <div
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateRows: "auto 1fr",
            }}
          >
            <AdminButtons
              {...{ showScores, setShowScores, eventID: event._id }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 2fr",
                gap: "2rem",
              }}
            >
              {activeEvent && (
                <Teams eventID={event._id} teams={activeEvent.teams} />
              )}
              {activeEvent && <Divider />}
              <IfElse
                showIf={showScores}
                showTrue={
                  activeEvent && (
                    <SocoreStatusComponent scores={activeEvent.scores} />
                  )
                }
                showFalse={
                  activeEvent && <Judges judges={activeEvent.status} />
                }
              />
            </div>
          </div>
        }
        showFalse={<StartButton eventID={event._id} />}
      />
    </div>
  );
}

function SocoreStatusComponent({ scores }: { scores: ScoreStatus }) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {Object.keys(scores).map((name) => (
        <div>
          {" "}
          {name} has scored up to heat {scores[name]}{" "}
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { Event } from "../../state/types";
import Topbar from "../event/Topbar";
import Teams from "./subcomponents/Teams";
import Judges from "./subcomponents/Judges";
import Divider from "../util/Divider";
import { AdminButtons, StartButton } from "./subcomponents/Buttons";
import useActiveEvent from "../../state/hooks/useActiveEvent";
import IfElse from "../util/IfElse";
import { useLocalStorage } from "../../util/hooks";
import SocoreStatusComponent from "./subcomponents/Scores";

function useStatus(): [status: boolean, toggle: () => void] {
  const [status, setStatus] = useLocalStorage("scores_or_judge", "judges");
  const [show, set] = useState(status === "scores" ? true : false);
  const toggle = () => {
    set(!show);
    setStatus(show ? "judges" : "scores");
  };
  return [show, toggle];
}

export default function Admin({ event }: { event: Event }) {
  const [showScores, setShowScores] = useStatus();
  const { activeEvent } = useActiveEvent(event._id);

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
                    <SocoreStatusComponent
                      scores={activeEvent.scores}
                      numHeats={event.heats.length}
                    />
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

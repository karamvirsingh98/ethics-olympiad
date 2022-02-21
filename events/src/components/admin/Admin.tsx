import { useEffect, useState } from "react";
import { client } from "../../main";
import { Event } from "../../state/types";
import { ActiveEvent } from "@ethics-olympiad/types";
import IfElse from "../util/IfElse";
import Topbar from "../event/Topbar";
import Teams from "./subcomponents/Teams";
import Judges from "./subcomponents/Judges";
import Divider from "../util/Divider";

export default function Admin({ event }: { event: Event }) {
  const [active, setActive] = useState<ActiveEvent | null>();
  const [showScoreStatus, setShowScoreStatus] = useState(false);

  console.log(event);

  console.log("b");

  //TODO: refactor into a new hook, and probably refactor hooks overall 

  useEffect(() => {
    client.service("api/active").get(event._id).then(setActive);
    client.service("api/active").on("created", setActive);
    client.service("api/active").on("updated", setActive);
    return () => {
      client.service("api/active").removeListener("created");
      client.service("api/active").removeListener("updated");
    };
  }, []);

  return (
    <div className="admin">
      <Topbar event={event} admin />
      <IfElse
        showIf={active ? true : false}
        showFalse={<StartButton eventID={event._id} />}
        showTrue={
          <div
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateRows: "auto 1fr",
            }}
          >
            <div style={{ display: "flex", gap: "2rem", placeSelf: "end" }}>
              <button
                className="blue"
                onClick={() => setShowScoreStatus(!showScoreStatus)}
              >
                {" "}
                Show {showScoreStatus
                  ? "Heat Progress"
                  : "Score Submissions"}{" "}
              </button>
              <button className="red">End Event</button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 2fr",
                gap: "2rem",
              }}
            >
              <Teams teams={event.teams} />
              <Divider />
              {active && <Judges judges={active.status} />}
            </div>
          </div>
        }
      />
    </div>
  );
}

function StartButton({ eventID }: { eventID: string }) {
  return (
    <button
      style={{ placeSelf: "center", fontSize: "2rem" }}
      className="green"
      onClick={() => client.service("api/active").create({ eventID })}
    >
      Start Event
    </button>
  );
}

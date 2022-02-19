import { useEffect, useState } from "react";
import { client } from "../../../main";
import { Event } from "../../../state/types";
import { ActiveEvent, Team } from "@ethics-olympiad/types";
import IfElse from "../../util/IfElse";
import Topbar from "../Topbar";
import Teams from "./subcomponents/Teams";
import Judges from "./subcomponents/Judges";
import Divider from "../util/Divider";

export default function Admin({ event }: { event: Event }) {
  const [active, set] = useState<ActiveEvent | null>();

  console.log(event);

  console.log("b");

  useEffect(() => {
    client.service("api/active").get(event._id).then(set);
    client.service("api/active").on("created", set);
    client.service("api/active").on("updated", set);
    return () => {
      client.service("api/active").removeListener("created");
      client.service("api/active").removeListener("updated");
    };
  }, []);

  console.log(active);

  return (
    <div className="admin">
      <Topbar event={event} admin />
      <IfElse
        showIf={active ? true : false}
        showFalse={<StartButton eventID={event._id} />}
        showTrue={
          <div style={{ display: 'grid', gap: "2rem", gridTemplateRows: "auto 1fr"}}>
            <div style={{ display: "flex", gap: "2rem", placeSelf: "end"}}>
              <button className="red">
                End Event
              </button>
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

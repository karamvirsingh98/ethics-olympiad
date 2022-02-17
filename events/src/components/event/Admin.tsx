import { useEffect, useState } from "react";
import { client } from "../../main";
import { Event } from "../../state/types";
import { ActiveEvent, Team } from "@ethics-olympiad/types";
import IfElse from "../util/IfElse";
import Topbar from "./Topbar";
import RoundTracker from "./util/RoundTracker";

export default function Admin({ event }: { event: Event }) {
  const [active, set] = useState<ActiveEvent | null>();

  console.log(event)

  console.log('b')

  useEffect(() => {
    client.service("api/active").get(event._id).then(set);
    client.service("api/active").on("created", set);
    client.service("api/active").on("updated", set);
    return () => {
      client.service("api/active").removeListener("created");
      client.service("api/active").removeListener("updated");
    };
  }, []);

  console.log(active)

  return (
    <div className="admin">
      <Topbar event={event} admin />
      <IfElse
        showIf={active ? true : false}
        showFalse={
          <button
            style={{ placeSelf: "center", fontSize: "2rem" }}
            className="green"
            onClick={() =>
              client.service("api/active").create({ eventID: event._id })
            }
          >
            Start Event
          </button>
        }
        showTrue={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "2rem",
            }}
          >
            <Teams teams={event.teams} />
            {active && <Judges judges={active.status} />}
          </div>
        }
      />
    </div>
  );
}

function Teams({ teams }: { teams: Team[] }) {
  return (
    <div style={{ display: "grid", gap: "1rem", height: "fit-content" }}>
      <div style={{ fontSize: "1.75rem" }}> Teams </div>
      {teams.map((team, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div> {team.name} </div>
          <div> {team.present ? "pres" : "not"} </div>
        </div>
      ))}
    </div>
  );
}

function Judges({
  judges,
}: {
  judges: {
    [key: string]: {
      heatNumber: number;
      roundNumber: number;
      stageNumber: number;
    };
  };
}) {
  const names = Object.keys(judges);

  return (
    <div>
      {names.map((name) => (
        <div style={{ display: 'grid', gap: '1rem' }} key={name}>
          <div style={{ fontSize: '2rem' }}>  {name} </div>
          <RoundTracker stage={judges[name].stageNumber} />
        </div>
      ))}
    </div>
  );
}

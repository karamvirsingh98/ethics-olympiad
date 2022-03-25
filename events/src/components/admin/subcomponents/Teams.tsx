import { Team } from "@ethics-olympiad/types";
import { useState } from "react";
import { client } from "../../../main";
import RoundTracker from "../../event/util/RoundTracker";
import Switch from "../../util/Switch";

export default function Teams({
  eventID,
  teams,
}: {
  eventID: string;
  teams: Team[];
}) {
  const updateTeam = (teamname: string, present: boolean) => () => {
    client.service("api/active").patch(eventID, { teamname, present });
  };

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
          <div> {team.teamName} </div>
          <Switch
            active={team.present}
            onClick={updateTeam(team.teamName, !team.present)}
          />
        </div>
      ))}
    </div>
  );
}

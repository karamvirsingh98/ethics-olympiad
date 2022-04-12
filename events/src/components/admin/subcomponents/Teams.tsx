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
  const updateTeam = (teamName: string, present: boolean) => () => {
    client.service("api/active").patch(eventID, { teamName, present });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxHeight: "80vh",
        overflow: "hidden",
        overflowY: "scroll",
        paddingRight: "1rem",
      }}
    >
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

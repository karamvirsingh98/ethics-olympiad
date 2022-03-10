import { Team } from "@ethics-olympiad/types";
import RoundTracker from "../../event/util/RoundTracker";

export default function Teams({ teams }: { teams: Team[] }) {
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

export function Dot() {
  return (
    <div /> 
  )
}
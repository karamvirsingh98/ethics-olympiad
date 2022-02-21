import { Score, Team } from "@ethics-olympiad/types";
import Selector from "../../util/Selector";

export default function TeamSelector({
  teams,
  score,
  set,
  teamA,
}: {
  teams: Team[];
  score: Score;
  set: (score: Score) => void;
  teamA?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
      }}
    >
      <div style={{ whiteSpace: "nowrap", fontSize: "1.5rem" }}>
        Team {teamA ? "A" : "B"}{" "}
      </div>
      {teams && (
        <Selector
          teams={teams}
          selected={teamA ? score.teamA : score.teamB}
          onSelect={
            teamA
              ? (teamA) => set({ ...score, teamA })
              : (teamB) => set({ ...score, teamB })
          }
        />
      )}
    </div>
  );
}

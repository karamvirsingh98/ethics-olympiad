import { Score, Team, TeamScore } from "@ethics-olympiad/types";
import { SCORE_FIELDS } from "../scoreFields";
import ScoreDots from "./ScoreDots";
import TeamSelector from "./Selector";

export default function TeamScoreComponent({
  teams,
  score,
  set,
  updateScore,
  teamA,
}: {
  teams: Team[];
  score: Score;
  set: (score: Score) => void;
  updateScore: (field: string, newScore: number, teamA: boolean) => void;
  teamA?: boolean;
}) {
  const FIELDS = Object.keys(SCORE_FIELDS) as Array<keyof TeamScore>;

  return (
    <div style={{ display: "grid", gap: "2rem", height: "fit-content" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <div style={{ whiteSpace: "nowrap", fontSize: "1.5rem" }}>Team { teamA ? 'A' : "B" } </div>
        {teams && (
          <TeamSelector
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
      {FIELDS.map((label) => (
        <ScoreDots
          key={teamA ? label + "A" : label + "B"}
          label={label}
          description={SCORE_FIELDS[label].description}
          numDots={SCORE_FIELDS[label].max}
          selected={teamA ? score.scoreA[label] : score.scoreB[label]}
          onSelect={(newScore) =>
            updateScore(label, newScore, teamA ? true : false)
          }
        />
      ))}
    </div>
  );
}

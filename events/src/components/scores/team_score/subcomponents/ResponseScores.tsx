import { Score, TeamScore } from "@ethics-olympiad/types";
import { SCORE_FIELDS } from "../../score_fields";
import ScoreSlider from "../../util/ScoreSlider";
import { UpdateScore } from "../TeamScore";

export default function ResponseScores({
  score,
  updateScore,
  teamA,
}: {
  score: Score;
  updateScore: UpdateScore;
  teamA?: boolean;
}) {
  const FIELDS: Array<keyof TeamScore> = ["response", "judgeResponse"];

  return (
    <div
      className="grey-flat"
      style={{
        display: "grid",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "0.25rem",
      }}
    >
      {FIELDS.map((label) => (
        <ScoreSlider
          key={teamA ? label + "A" : label + "B"}
          label={label}
          description={SCORE_FIELDS[label].description}
          max={SCORE_FIELDS[label].max}
          value={teamA ? score.scoreA[label] : score.scoreB[label]}
          onChange={(newScore) =>
            updateScore(label, newScore, teamA ? true : false)
          }
        />
      ))}
    </div>
  );
}

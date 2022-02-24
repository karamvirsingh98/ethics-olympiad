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

  function format(label: keyof TeamScore) {
    if (label === 'judgeResponse') return 'Judge Q&A Response'
    else if (label === 'response') return 'Commentary Response'
    return 'Response'
  }

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
          label={format(label)}
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

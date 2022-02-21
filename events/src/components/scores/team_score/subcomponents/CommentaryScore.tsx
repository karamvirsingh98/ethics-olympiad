import { Score } from "@ethics-olympiad/types";
import { SCORE_FIELDS } from "../../score_fields";
import ScoreSlider from "../../util/ScoreSlider";
import { UpdateScore } from "../TeamScore";

export default function CommentaryScore({
  score,
  updateScore,
  teamA,
}: {
  score: Score;
  updateScore: UpdateScore;
  teamA?: boolean;
}) {
  return (
    <div
      className="grey-flat"
      style={{
        padding: "1rem",
        borderRadius: "0.25rem",
      }}
    >
      <ScoreSlider
        label="Commentary"
        description={SCORE_FIELDS.commentary.description}
        max={SCORE_FIELDS.commentary.max}
        value={teamA ? score.scoreA.commentary : score.scoreB.commentary}
        onChange={(newScore) =>
          updateScore("commentary", newScore, teamA ? true : false)
        }
      />
    </div>
  );
}

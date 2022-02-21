import { Score, TeamScore } from "@ethics-olympiad/types";
import { SCORE_FIELDS } from "../../../scoreFields";
import ScoreDots from "../../ScoreDots";
import { UpdateScore } from "../TeamScore";

export default function PresentationScore({
  score,
  updateScore,
  teamA,
}: {
  score: Score;
  updateScore: UpdateScore;
  teamA?: boolean;
}) {
  const FIELDS: Array<keyof TeamScore> = [
    "clarity",
    "centrality",
    "thoughtfulness",
  ];

  const total = (score: TeamScore) => {
    let total = 0;
    FIELDS.forEach((field) => (total += score[field]));
    return total;
  };

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
      <div style={{ fontSize: "1.5rem", placeSelf: "center end" }}>
        {" "}
        Total: {total(teamA ? score.scoreA : score.scoreB)}{" "}
      </div>
    </div>
  );
}


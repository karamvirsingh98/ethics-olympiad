import { Score, Team, TeamScore } from "@ethics-olympiad/types";
import { Fragment } from "react";
import IfElse from "../../util/IfElse";
import { SCORE_FIELDS } from "../score_fields";
import ScoreDots from "../util/ScoreDots";
import CommentaryScore from "./subcomponents/CommentaryScore";
import PresentationScore from "./subcomponents/PresentationScore";
import ResponseScores from "./subcomponents/ResponseScores";
import TeamSelector from "./subcomponents/TeamSelector";

export type UpdateScore = (
  field: string,
  newScore: number,
  teamA: boolean
) => void;

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
  updateScore: UpdateScore;
  teamA?: boolean;
}) {
  const total = (score: TeamScore) => {
    let total = 0;
    Object.keys(SCORE_FIELDS).forEach(
      (field) => (total += score[field as keyof TeamScore])
    );
    return total;
  };

  return (
    <div style={{ display: "grid", gap: "2rem", height: "fit-content" }}>
      <TeamSelector teams={teams} score={score} set={set} teamA={teamA} />
      <IfElse
        showIf={teamA ? true : false}
        showTrue={
          <Fragment>
            <PresentationScore {...{ score, updateScore, teamA }} />
            <ResponseScores {...{ score, updateScore, teamA }} />
          </Fragment>
        }
        showFalse={<CommentaryScore {...{ score, updateScore, teamA }} />}
      />
      <IfElse
        showIf={teamA ? true : false}
        showTrue={<CommentaryScore {...{ score, updateScore, teamA }} />}
        showFalse={
          <Fragment>
            <PresentationScore {...{ score, updateScore, teamA }} />
            <ResponseScores {...{ score, updateScore, teamA }} />
          </Fragment>
        }
      />
      <div
        className="grey-flat"
        style={{ padding: "1rem", borderRadius: "0.25rem" }}
      >
        <ScoreDots
          label="respectful"
          description={SCORE_FIELDS.respectful.description}
          numDots={SCORE_FIELDS.respectful.max}
          selected={teamA ? score.scoreA.respectful : score.scoreB.respectful}
          onSelect={(newScore) =>
            updateScore("respectful", newScore, teamA ? true : false)
          }
        />
      </div>
      <div
        style={{
          fontSize: "2rem",
          placeSelf: "center end",
          padding: "1rem",
          borderRadius: "0.25rem",
        }}
      >
        Total Score : {total(teamA ? score.scoreA : score.scoreB)}
      </div>
    </div>
  );
}

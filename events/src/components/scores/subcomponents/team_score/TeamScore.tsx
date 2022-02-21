import { Score, Team, TeamScore } from "@ethics-olympiad/types";
import { Fragment } from "react";
import IfElse from "../../../util/IfElse";
import { SCORE_FIELDS } from "../../scoreFields";
import ScoreDots from "../ScoreDots";
import Selector from "../Selector";
import CommentaryScore from "./subcomponents/CommentaryScore";
import PresentationScore from "./subcomponents/PresentationScore";
import ResponseScores from "./subcomponents/ResponseScores";
import TeamSelector from "./subcomponents/TeamSelector";

export type UpdateScore = (field: string, newScore: number, teamA: boolean) => void;

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
      <ScoreDots
        label="Respectful"
        description={SCORE_FIELDS.respectful.description}
        numDots={SCORE_FIELDS.respectful.max}
        selected={teamA ? score.scoreA.respectful : score.scoreB.respectful}
        onSelect={(newScore) =>
          updateScore("respectful", newScore, teamA ? true : false)
        }
      />
    </div>
  );
}


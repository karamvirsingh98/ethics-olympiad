import { Score, Team, TeamScore } from "@ethics-olympiad/types";
import { Fragment, useEffect, useState } from "react";
import IfElse from "../../util/IfElse";
import Switch from "../../util/Switch";
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

export type ToggleHonorable = (teamA: boolean) => () => void;

export default function TeamScoreComponent({
  teams,
  score,
  set,
  updateScore,
  toggleHonorable,
  teamA,
}: {
  teams: Team[];
  score: Score;
  set: (score: Score) => void;
  updateScore: UpdateScore;
  toggleHonorable: ToggleHonorable;
  teamA?: boolean;
}) {
  const total = (score: TeamScore) =>
    Object.keys(SCORE_FIELDS).reduce(
      (a, v) => a + score[v as keyof TeamScore],
      0
    );

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
      <HonorableMention
        teamA={teamA ? true : false}
        score={score}
        toggleHonorable={toggleHonorable}
      />
      <div
        style={{
          fontSize: "2rem",
          placeSelf: "center end",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        Total Score : {total(teamA ? score.scoreA : score.scoreB)}
      </div>
    </div>
  );
}

function HonorableMention({
  teamA,
  score,
  toggleHonorable,
}: {
  teamA: boolean;
  score: Score;
  toggleHonorable: ToggleHonorable;
}) {
  const [disabled, set] = useState(false);

  const total = (score: TeamScore) =>
    Object.keys(SCORE_FIELDS).reduce(
      (a, v) => a + score[v as keyof TeamScore],
      0
    );

  console.log("dis", disabled);

  useEffect(() => {
    if (teamA && total(score.scoreA) > total(score.scoreB)) set(true);
    else if (total(score.scoreB) > total(score.scoreA)) set(true);
  }, [score]);

  return (
    <div
      className="flex-between grey-flat"
      style={{ gap: "2rem", padding: "1rem" }}
    >
      <div style={{ fontSize: "1.25rem" }}>
        Give this team an Honorable Mention?
      </div>
      <Switch
        active={teamA ? score.honorableA : score.honorableB}
        onClick={toggleHonorable(teamA ? true : false)}
        // disabled={disabled}
      />
    </div>
  );
}

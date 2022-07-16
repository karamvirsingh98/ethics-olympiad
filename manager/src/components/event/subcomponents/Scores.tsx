import { Event, Score, Team, TeamScore } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../main";
import Conditional from "../../util/Conditional";
import CsvExporter from "./CsvExporter";
import ScoreDropdown, { ScoreOption } from "./ScoreDropdown";

const total = (score: TeamScore) => {
  let total = 0;
  Object.keys(score).forEach(
    (field) => (total += score[field as keyof TeamScore])
  );
  return total;
};

export default function Scores({ event }: { event: Event }) {
  const { eventID } = useParams();
  const [scores, setScores] = useState<Score[]>();
  const [option, setOption] = useState<ScoreOption>("Team");
  const [checking, setChecking] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    checkForScores();
  }, [eventID]);

  const checkForScores = () => {
    setChecking(true);
    client
      .service("api/scores")
      .find({ query: { eventID: event._id } })
      .then((res: Score[]) => {
        setChecking(false);
        setScores(res);
      });
  };

  const deleteScores = async () => {
    setDeleting(true);
    await client
      .service("api/remove-scores")
      .create({ eventID: event._id })
      .then(console.log);
    checkForScores();
    setDeleting(false);
  };

  return (
    <div className="teams">
      <div className="flex-between">
        <div style={{ fontSize: "1.5rem", width: "fit-content" }}>Scores</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <ScoreDropdown selected={option} onSelect={setOption} />
          <button
            onClick={checkForScores}
            disabled={checking}
            className={checking ? "orange" : "green"}
          >
            Refresh
          </button>
          {/* <button className="red" disabled={deleting} onClick={deleteScores}>
            Delete Scores
          </button> */}
          {scores && <CsvExporter title={event.eventTitle} scores={scores} />}
        </div>
      </div>

      <div style={{ maxHeight: "50vh", overflow: "scroll" }}>
        {scores && (
          <Conditional
            condition={option === "Individual"}
            showTrue={<IndividualScoreCards scores={scores} />}
            showFalse={<TeamScoreCards scores={scores} teams={event.teams} />}
          />
        )}
      </div>
    </div>
  );
}

function IndividualScoreCards({ scores }: { scores?: Score[] }) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {scores &&
        scores.map((score) => (
          <div
            style={{ display: "grid", gap: "1rem", padding: "1rem" }}
            className="grey-flat"
          >
            <div className="flex-between">
              <div>{"Judge: " + score.judgeName}</div>
              <div>{"Heat Number: " + score.heatNumber}</div>
            </div>
            <div className="flex-between">
              <div>{"TeamA: " + score.teamA}</div>
              <div>{"Total: " + total(score.scoreA)}</div>
            </div>
            <div className="flex-between">
              <div>{"TeamB: " + score.teamB}</div>
              <div>{"Total: " + total(score.scoreB)}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

function TeamScoreCards({
  scores,
  teams,
}: {
  scores?: Score[];
  teams?: Team[];
}) {
  interface TeamTotal {
    teamName: string;
    total: number;
    honorable: boolean;
  }

  const getTeamScores = () =>
    scores &&
    teams &&
    teams.map(({ teamName }) =>
      scores
        .filter(({ teamA, teamB }) => teamA === teamName || teamB === teamName)
        .sort((a, b) => (a.heatNumber < b.heatNumber ? 1 : -1))
        .map(
          (score) =>
            ({
              teamName,
              total: total(
                score.teamA === teamName ? score.scoreA : score.scoreB
              ),
              honorable:
                score.teamA === teamName ? score.honorableA : score.honorableB,
            } as TeamTotal)
        )
    );

  const getGrandTotal = (teamScores: TeamTotal[]) => {
    return teamScores.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
  };

  const ts = getTeamScores();

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {scores &&
        scores.length > 0 &&
        ts
          ?.filter((ts) => ts.length)
          .sort((a, b) => (getGrandTotal(a) < getGrandTotal(b) ? 1 : -1))
          .map((teamTotals, i) => {
            const hasHonorableMention = teamTotals.some(
              (total) => total.honorable
            );
            return (
              teamTotals.length && (
                <div
                  key={i}
                  className="grey-flat"
                  style={{
                    padding: "1rem",
                    borderRadius: "0.2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {teamTotals[0] ? teamTotals[0].teamName : ""}
                    <b>{hasHonorableMention ? "H" : ""}</b>
                  </div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    {teamTotals.map((score, i) => (
                      <div
                        key={score.teamName + i}
                        style={{
                          display: "grid",
                          gap: "1rem",
                          placeItems: "center",
                        }}
                      >
                        <div> Heat{i + 1} </div>
                        <div> {score.total} </div>
                      </div>
                    ))}
                    <div
                      style={{
                        display: "grid",
                        gap: "1rem",
                        placeItems: "center",
                      }}
                    >
                      <div> Grand Total </div>
                      <div> {getGrandTotal(teamTotals) || ""} </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
    </div>
  );
}

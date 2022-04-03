import { Score, TeamScore } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../../main";

export default function Scores({ eventID }: { eventID: string }) {
  const [scores, setScores] = useState<Score[]>();
  const [checking, set] = useState(false);

  const checkForScores = () => {
    set(true);
    client
      .service("api/scores")
      .find({ query: { eventID } })
      .then((res: Score[]) => {
        set(false);
        setScores(res);
      });
  };

  useEffect(() => {
    checkForScores();
  }, []);

  const total = (score: TeamScore) => {
    let total = 0;
    Object.keys(score).forEach(
      (field) => (total += score[field as keyof TeamScore])
    );
    return total;
  };

  return (
    <div className="teams">
      <div className="flex-between">
        <div style={{ fontSize: "1.5rem", width: "fit-content" }}>Scores</div>
        <button
          onClick={checkForScores}
          disabled={checking}
          className={checking ? "orange" : "green"}
        >
          Check for Scores
        </button>
      </div>
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
    </div>
  );
}

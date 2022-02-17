import { TeamScore } from "@ethics-olympiad/types";
import { Route, Routes } from "react-router-dom";
import { useScore } from "../../../state/hooks/useScore";
import ScoreDots from "./subcomponents/ScoreDots";

export default function Scores() {
  return (
    <div className="scores">
      <div> Scores </div>
      <Routes>
        <Route path="/:heatNumber" element={<ScoreComponent />} />
      </Routes>
    </div>
  );
}

function ScoreComponent() {
  const { score, set, updateScore } = useScore();

  console.log(score)

  return (
    <div className="score">
      <div style={{ display: "grid", gap: "1rem" }}>
        Team A 
        {Object.keys(score.teamA).map((label) => (
          <ScoreDots
            label={label}
            numDots={5}
            selected={score.scoreA[label as keyof TeamScore]}
            onSelect={(newScore) => updateScore(label, newScore, true)}
          />
        ))}
      </div>
      <div style={{ display: "grid", gap: "1rem" }}>
        Team B 
        {Object.keys(score.teamA).map((label) => (
          <ScoreDots
            label={label}
            numDots={5}
            selected={score.scoreA[label as keyof TeamScore]}
            onSelect={(newScore) => updateScore(label, newScore, false)}
          />
        ))}
      </div>
    </div>
  );
}


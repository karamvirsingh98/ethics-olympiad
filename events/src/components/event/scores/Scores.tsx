import { TeamScore } from "@ethics-olympiad/types";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useScore } from "../../../state/hooks/useScore";
import { Event } from "../../../state/types";
import { DEFAULT_SCORE } from "../../../util/defaults";
import Topbar from "../Topbar";
import ScoreDots from "./subcomponents/ScoreDots";
import TeamSelector from "./subcomponents/Selector";

export default function Scores({ event }: { event: Event }) {
  const navigate = useNavigate();
  return (
    <div className="scores">
      <Topbar event={event} />
      <div
        style={{ display: "grid", gap: "2rem", gridTemplateColumns: "auto 1fr" }}
      >
        <div style={{ display: "grid", gap: "1rem", height: "fit-content" }}>
          {event.heats.map((_, i) => (
            <button
              key={i}
              className="blue"
              onClick={() => navigate(`./heat${i + 1}`)}
              style={{ fontSize: "1.5rem", padding: "0.5rem 2rem" }}
            >
              Heat {i + 1}
            </button>
          ))}
        </div>
        <Routes>
          <Route path="/heat:heatNumber" element={<ScoreComponent />} />
        </Routes>
      </div>
    </div>
  );
}

function ScoreComponent() {
  const { score, set, updateScore } = useScore(); 
  


  const SCORE_FIELDS = Object.keys(DEFAULT_SCORE) as Array<keyof TeamScore>

  return (
    <div className="score">
      <div style={{ display: "grid", gap: "2rem", height: "fit-content" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div> Team A </div>
          <TeamSelector teams={[]} selected={score.teamA} onSelect={(teamA) => set({ ...score, teamA})}  />
        </div>
        {SCORE_FIELDS.map((label) => (
          <ScoreDots
            key={label + "A"}
            label={label}
            numDots={5}
            selected={score.scoreA[label]}
            onSelect={(newScore) => updateScore(label, newScore, true)}
          />
        ))}
      </div>
      <div style={{ display: "grid", gap: "2rem", height: "fit-content" }}>
        Team B
        {SCORE_FIELDS.map((label) => (
          <ScoreDots
            key={label + "B"}
            label={label}
            numDots={5}
            selected={score.scoreB[label]}
            onSelect={(newScore) => updateScore(label, newScore, false)}
          />
        ))}
      </div>
    </div>
  );
}

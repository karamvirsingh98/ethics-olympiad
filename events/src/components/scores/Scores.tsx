import { Team } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { client } from "../../main";
import { useScore } from "../../state/hooks/useScore";
import { Event } from "../../state/types";
import Topbar from "../event/Topbar";
import Divider from "../util/Divider";
import TeamScoreComponent from "./subcomponents/team_score/TeamScore";

export default function Scores({ event }: { event: Event }) {
  const navigate = useNavigate();
  const [teams, set] = useState<Team[]>();

  useEffect(() => {
    client.service("api/active");
  });

  return (
    <div className="scores">
      <Topbar event={event} />
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "auto auto 1fr",
        }}
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
        <Divider vertical />
        <Routes>
          <Route
            path="/heat:heatNumber"
            element={<ScoreComponent teams={[]} />}
          />
        </Routes>
      </div>
    </div>
  );
}

function ScoreComponent({ teams }: { teams: Team[] }) {
  const { score, set, updateScore } = useScore();

  return (
    <div className="score">
      <TeamScoreComponent
        teams={teams}
        score={score}
        set={set}
        updateScore={updateScore}
        teamA
      />
      <Divider vertical />
      <TeamScoreComponent
        teams={teams}
        score={score}
        set={set}
        updateScore={updateScore}
      />
    </div>
  );
}


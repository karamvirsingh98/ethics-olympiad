import { Team, TeamScore } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { client } from "../../main";
import { useScore } from "../../state/hooks/useScore";
import { Event } from "../../state/types";
import Topbar from "../event/Topbar";
import Divider from "../util/Divider";
import TeamScoreComponent from "./team_score/TeamScore";

export default function Scores({ event }: { event: Event }) {
  const navigate = useNavigate();
  const [teams, set] = useState<Team[]>();

  useEffect(() => {
    client.service("api/active").get(event._id).then(console.log);
  }, []);

  return (
    <div className="scores" style={{ overflow: "hidden" }}>
      <Topbar event={event} />
      <div style={{ display: "grid", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "1rem", height: "fit-content", padding: "0 0 1rem 1rem" }}>
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
        <Divider />
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
  const { heatNumber } = useParams();

  const validate = () => {
    const keys = Object.keys(score.scoreA) as unknown as Array<keyof TeamScore>;
    const teamA =
      keys.every((key) => score.scoreA[key]) && score.teamA ? true : false;
    const teamB =
      keys.every((key) => score.scoreB[key]) && score.teamB ? true : false;
    return teamA && teamB;
  };

  return (
    <div
      style={{
        overflowY: "scroll",
        display: "grid",
        gap: "2rem",
        padding: "2rem 1rem",
      }}
    >
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
      <button
        className={validate() ? "green" : "red"}
        style={{
          width: "100%",
          fontSize: "2rem",
          cursor: validate() ? undefined : "not-allowed",
        }}
        disabled={validate()}
      >
        Submit Scores for Heat {heatNumber}
      </button>
    </div>
  );
}

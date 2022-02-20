import { Score, Team, TeamScore } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { client } from "../../../main";
import { useScore } from "../../../state/hooks/useScore";
import { Event } from "../../../state/types";
import Topbar from "../Topbar";
import { SCORE_FIELDS } from "./scoreFields";
import ScoreDots from "./subcomponents/ScoreDots";
import TeamSelector from "./subcomponents/Selector";

export default function Scores({ event }: { event: Event }) {
  const navigate = useNavigate();
  const [teams, set] = useState<Team[]>();

  useEffect(() => {
    client.service("active");
  });

  return (
    <div className="scores">
      <Topbar event={event} />
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "auto 1fr",
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
        <Routes>
          <Route
            path="/heat:heatNumber"
            element={teams && <ScoreComponent teams={teams} />}
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
      <TeamScoreComponent
        teams={teams}
        score={score}
        set={set}
        updateScore={updateScore}
      />
    </div>
  );
}

function TeamScoreComponent({
  teams,
  score,
  set,
  updateScore,
  teamA,
}: {
  teams: Team[];
  score: Score;
  set: (score: Score) => void;
  updateScore: (field: string, newScore: number, teamA: boolean) => void;
  teamA?: boolean;
}) {
  const FIELDS = Object.keys(SCORE_FIELDS) as Array<keyof TeamScore>;

  return (
    <div style={{ display: "grid", gap: "2rem", height: "fit-content" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        <div style={{ whiteSpace: "nowrap", fontSize: "1.5rem" }}>Team A</div>
        {teams && (
          <TeamSelector
            teams={teams}
            selected={teamA ? score.teamA : score.teamB}
            onSelect={
              teamA
                ? (teamA) => set({ ...score, teamA })
                : (teamB) => set({ ...score, teamB })
            }
          />
        )}
      </div>
      {FIELDS.map((label) => (
        <ScoreDots
          key={teamA ? label + "A" : label + "B"}
          label={label}
          description={SCORE_FIELDS[label].description}
          numDots={SCORE_FIELDS[label].max}
          selected={teamA ? score.scoreA[label] : score.scoreB[label]}
          onSelect={(newScore) => updateScore(label, newScore, teamA ? true : false)}
        />
      ))}
    </div>
  );
}

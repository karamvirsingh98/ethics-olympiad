import { Team, TeamScore } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useJudgeName } from "../../App";
import { client } from "../../main";
import useActiveEvent from "../../state/hooks/useActiveEvent";
import { useScore } from "../../state/hooks/useScore";
import { Event } from "../../state/types";
import Topbar from "../event/Topbar";
import Divider from "../util/Divider";
import SubmitDialog from "./SubmitDialog";
import TeamScoreComponent from "./team_score/TeamScore";

export default function Scores({ event }: { event: Event }) {
  const navigate = useNavigate();
  const activeEvent = useActiveEvent(event._id);
  const { judgeName } = useJudgeName();
  const [scored, set] = useState<number>();

  useEffect(() => {
    set(activeEvent?.scores[judgeName] || 0);
  }, [activeEvent]);

  const getColor = (i: number) => {
    if (scored !== undefined && activeEvent) {
      if (i < scored) return "green";
      else if (i > scored) return "red";
      else return "blue";
    } else return "grey";
  };

  return (
    <div className="scores" style={{ overflow: "hidden" }}>
      <Topbar event={event} />
      <div
        style={{
          display: "grid",
          overflow: "hidden",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            height: "fit-content",
            padding: "0 0 1rem 1rem",
          }}
        >
          {event.heats.map((_, i) => (
            <button
              key={i}
              className={getColor(i)}
              disabled={!activeEvent || getColor(i) === "red" || getColor(i) === "green"}
              onClick={() => navigate(`./heat${i + 1}`)}
              style={{
                fontSize: "1.5rem",
                padding: "0.5rem 2rem",
                cursor:
                !activeEvent || getColor(i) === "red" || getColor(i) === "green"
                    ? "not-allowed"
                    : undefined,
              }}
            >
              Heat {i + 1}
            </button>
          ))}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  placeSelf: "center",
                  fontSize: "2rem",
                  padding: "10vw",
                }}
              >
                {activeEvent
                  ? scored === event.heats.length
                    ? "All Heats Scored! Thanks for participating :)"
                    : "Please click on the blue heat button to start scoring the current heat. Green ones have already been scored, and red ones are inaccessible until you finish scoring the current heat. "
                  : "Event Inactive, please contact the organiser."}
              </div>
            }
          />
          <Route
            path="/heat:heatNumber"
            element={
              activeEvent && (
                <ScoreComponent
                  teams={activeEvent.teams.filter((team) => team.present)}
                />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function ScoreComponent({ teams }: { teams: Team[] }) {
  const { score, set, updateScore } = useScore();
  const { heatNumber } = useParams();
  const [showSubmit, setShowSubmit] = useState(false);

  const validate = () => {
    const keys = Object.keys(score.scoreA) as unknown as Array<keyof TeamScore>;
    const teamA =
      keys.every((key) => score.scoreA[key]) && score.teamA ? true : false;
    const teamB =
      keys.every((key) => score.scoreB[key]) && score.teamB ? true : false;
    return teamA && teamB;
  };

  const submitScore = async () => {
    await client.service("api/scores").create(score).then(console.log);
    setShowSubmit(true);
  };

  return (
    <>
      <Divider />
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
          disabled={!validate()}
          onClick={submitScore}
        >
          Submit Scores for Heat {heatNumber}
        </button>
      </div>
      {showSubmit && <SubmitDialog heatNumber={Number(heatNumber!)} />}
    </>
  );
}

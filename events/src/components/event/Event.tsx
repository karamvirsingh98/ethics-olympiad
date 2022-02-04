import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import useUnlock, { useFullEvent } from "../../state/hooks/useUnlock";
import { Cases, Event, Olympaid } from "../../state/types";
import { useHeatNumber } from "../../util/hooks";
import UnlockManager from "../util/UnlockManager";
import Unlock from "./Unlock";

export default function EventComponent() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  const { olympiad, setOlympiad } = useFullEvent(eventID!);

  return (
    <UnlockManager
      unlocked={unlocked}
      isUnlocked={olympiad && <OlympiadRoutes olympiad={olympiad} />}
      notUnlocked={
        <Unlock eventID={eventID!} unlock={unlock} onUnlock={setOlympiad} />
      }
    />
  );
}

function OlympiadRoutes({ olympiad }: { olympiad: Olympaid }) {
  const { event, cases } = olympiad;

  return (
    <Routes>
      <Route path="/" element={<OlympiadSplash event={event} />} />
      <Route
        path="/heat:heatNumber/*"
        element={<Heat event={event} cases={cases} />}
      />
    </Routes>
  );
}

function OlympiadSplash({ event }: { event: Event }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontSize: "4rem",
        placeSelf: "center",
        display: "flex",
        placeItems: "center",
        gap: "2rem",
      }}
    >
      {event.title}
      <button className="green" onClick={() => navigate("./heat1")}>
        Begin!
      </button>
    </div>
  );
}

function Heat({ event, cases }: { event: Event; cases: Cases }) {
  const navigate = useNavigate();
  const { case1, case2 } = useHeatNumber(event.heats);

  return (
    <div style={{ display: "grid", gap: "2rem", gridTemplateRows: "auto 1fr" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "2rem" }}> {event.title} </div>
        <div style={{ paddingRight: "3rem", display: "flex", gap: "1rem" }}>
          {event.heats.map((_, i) => (
            <button
              key={i}
              className="blue"
              onClick={() => navigate(`../heat${i + 1}`)}
            >
              Heat {i + 1}
            </button>
          ))}
          <button className="orange"> Scores </button>
        </div>
      </div>
      <div>
        <div> {cases[case1].title} </div>
        <div style={{ whiteSpace: "pre-line" }}> {cases[case1].bodyText} </div>
        <div> {cases[case2].title} </div>
        <div> {cases[case2].bodyText} </div>
      </div>
    </div>
  );
}

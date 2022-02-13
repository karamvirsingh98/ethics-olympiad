import { Route, Routes, useParams } from "react-router-dom";
import { Cases, Event } from "../../../state/types";
import { useHeatNumber } from "../../../util/hooks";
import Topbar from "../Topbar";
import Flip from "../util/Flip";
import Round from "./Round";

export default function Heat({ event, cases }: { event: Event; cases: Cases }) {
  const { case1, case2 } = useHeatNumber( event.heats )

  return (
    <div style={{ display: "grid", gap: "2rem", gridTemplateRows: "auto 1fr", overflow: "hidden" }}>
      <Topbar event={event} />
      <Routes>
        <Route path="/" element={<Flip />} />
        <Route
          path="/round:roundNumber/*"
          element={
            <Round
              case1={cases[case1]}
              case2={cases[case2]}
              timers={event.timers}
            />
          }
        />
      </Routes>
    </div>
  );
}
  
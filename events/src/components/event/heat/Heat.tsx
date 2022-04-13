import { Route, Routes, useParams } from "react-router-dom";
import { Cases, Event } from "../../../state/types";
import { useHeatNumber } from "../../../util/hooks";
import Flip from "../util/Flip";
import Round from "./Round";

export default function Heat({ event, cases }: { event: Event; cases: Cases }) {
  const { heats, timers } = event;
  const { case1, case2 } = useHeatNumber(heats);

  return (
    <Routes>
      <Route path="/" element={<Flip />} />
      <Route
        path="/round:roundNumber/*"
        element={
          <Round case1={cases[case1]} case2={cases[case2]} timers={timers} />
        }
      />
    </Routes>
  );
}

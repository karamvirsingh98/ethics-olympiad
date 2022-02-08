import { Route, Routes, useParams } from "react-router-dom";
import { Case } from "../../../state/types";
import CaseOverview from "./CaseOverview";
import Stage from "./Stage";

export default function Round({
  case1,
  case2,
  timers,
}: {
  case1: Case;
  case2: Case;
  timers: number[];
}) {
  const { roundNumber } = useParams();

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Routes>
        <Route
          path="/"
          element={
            <CaseOverview
              _case={roundNumber && Number(roundNumber) === 1 ? case1 : case2}
            />
          }
        />
        <Route
          path="/stage:stageNumber"
          element={<Stage roundNumber={Number(roundNumber)} />}
        />
      </Routes>
    </div>
  );
}

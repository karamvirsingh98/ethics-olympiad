import { Route, Routes, useParams } from "react-router-dom";
import { Case } from "../../../state/types";
import CaseOverview from "./CaseOverview";
import Stage from "./Stage";

export default function Round({
  heatNumber,
  case1,
  case2,
  timers,
}: {
  heatNumber: number;
  case1: Case;
  case2: Case;
  timers: number[];
}) {
  const { roundNumber } = useParams();
  const round = Number(roundNumber);

  return (
    <div style={{ overflow: "hidden"}}>
      <Routes>
        <Route
          path="/"
          element={<CaseOverview _case={round === 1 ? case1 : case2} />}
        />
        <Route
          path="/stage:stageNumber"
          element={
            <Stage
              roundNumber={Number(roundNumber)}
              question={round === 1 ? case1.question : case2.question}
              timers={timers}
            />
          }
        />
      </Routes>
    </div>
  );
}

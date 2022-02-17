import { Case } from "@ethics-olympiad/types";
import { Route, Routes, useParams } from "react-router-dom";
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

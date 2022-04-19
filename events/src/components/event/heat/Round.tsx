import { Case } from "@ethics-olympiad/types";
import { Route, Routes, useParams } from "react-router-dom";
import IfElse from "../../util/IfElse";
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
    <div style={{ overflow: "hidden" }}>
      <Routes>
        <IfElse
          showIf={}
          showTrue={
            <>
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
            </>
          }
          showFalse={
            <Route
              path="/"
              element={<CaseOverview _case={round === 1 ? case1 : case2} />}
            />
          }
        />
      </Routes>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div style={{ display: "grid", placeItems: "center" }}>
        This Case was Not properly assigned, or there was an error loading this
        case.
      </div>
    </div>
  );
}

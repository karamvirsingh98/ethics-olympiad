import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Cases, Event } from "../../../state/types";
import { useHeatNumber } from "../../../util/hooks";
import Topbar from "../Topbar";
import Flip from "./Flip";

export default function Heat({ event, cases }: { event: Event; cases: Cases }) {
  const navigate = useNavigate();
  const { case1, case2 } = useHeatNumber(event.heats);

  return (
    <div style={{ display: "grid", gap: "2rem", gridTemplateRows: "auto 1fr" }}>
      <Topbar event={event} />
      <Routes>
        <Route path="/" element={<Flip />} />
        <Route path="/round:roundNumber" element={<Round />} />
      </Routes>
    </div>
  );
}

function Round() {
  const { roundNumber } = useParams();

  return <div>Round {roundNumber}</div>;
}

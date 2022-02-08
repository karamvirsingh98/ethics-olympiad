import { useParams } from "react-router-dom";
import RoundTracker from "../util/RoundTracker";

export default function Stage({ roundNumber }: { roundNumber: number }) {
  const { stageNumber } = useParams();
  const stage = Number(stageNumber);

  return (
    <div style={{ display: "grid", gap: "1rem", gridTemplateRows: "auto 1fr" }}>
      {roundNumber && <RoundTracker stage={stage} />}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoundTracker from "../util/RoundTracker";
import Timer from "../util/Timer";

export default function Stage({
  roundNumber,
  question,
  timers,
}: {
  roundNumber: number;
  question: string;
  timers: number[];
}) {
  const { stageNumber } = useParams();
  const [stage, set] = useState(Number(stageNumber))
  
  useEffect(() => {
    if (stage !== Number(stageNumber)) set(Number(stageNumber))
  }, [stage, stageNumber])

  return (
    <div className="stage">
      {roundNumber && <RoundTracker stage={stage} />}
      <div className="stage-content">
        <div style={{ fontSize: "3rem"}}>{question}</div>
        <Timer duration={timers[stage - 1]} />
      </div>
    </div>
  );
}

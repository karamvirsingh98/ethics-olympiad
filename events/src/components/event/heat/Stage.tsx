import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../..";
import RoundTracker from "../util/RoundTracker";
import Timer from "../util/Timer";

export default function Stage({
  question,
  timers,
}: {
  roundNumber: number;
  question: string;
  timers: number[];
}) {
  const { eventID, heatNumber, roundNumber, stageNumber } = useParams();
  const [stage, set] = useState(Number(stageNumber));

  useEffect(() => {
    if (stage !== Number(stageNumber)) set(Number(stageNumber));
    client.service("api/active").update(eventID, {
      judgeName: "kv",
      status: {
        heatNumber: Number(heatNumber),
        roundNumber: Number(roundNumber),
        stageNumber: Number(stageNumber),
      },
    });
  }, [stage, stageNumber]);

  return (
    <div className="stage">
      {roundNumber && <RoundTracker stage={stage} showButtons />}
      <div className="stage-content">
        <div style={{ fontSize: "3rem" }}>{question}</div>
        <Timer duration={timers[stage - 1]} />
      </div>
    </div>
  );
}

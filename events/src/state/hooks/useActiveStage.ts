import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useJudgeName } from "../../App";
import { client } from "../../main";

export default function useActiveStage() {
  const { eventID, heatNumber, roundNumber, stageNumber } = useParams();
  const [stage, set] = useState(Number(stageNumber));
  const { judgeName } = useJudgeName()

  useEffect(() => {
    if (stage !== Number(stageNumber)) set(Number(stageNumber));
    client.service("api/active").update(eventID, {
      judgeName,
      status: {
        heatNumber: Number(heatNumber),
        roundNumber: Number(roundNumber),
        stageNumber: Number(stageNumber),
      },
    });
  }, [stage, stageNumber]);

  return stage

}

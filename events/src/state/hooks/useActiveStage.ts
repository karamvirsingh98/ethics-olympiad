import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../main";
import useJudgeName from "./useJudgeName";

export default function useActiveStage() {
  const { eventID, heatNumber, roundNumber, stageNumber } = useParams();
  const [stage, set] = useState(Number(stageNumber));
  const { name: judgeName } = useJudgeName()

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

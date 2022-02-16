import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../..";

export default function useActiveStage() {
  const { eventID, heatNumber, roundNumber, stageNumber } = useParams();
  const [stage, set] = useState(Number(stageNumber));

  useEffect(() => {
    if (stage !== Number(stageNumber)) set(Number(stageNumber));
    client.service("api/active").update(eventID, {
      judgeName: "Karamvir Singh",
      status: {
        heatNumber: Number(heatNumber),
        roundNumber: Number(roundNumber),
        stageNumber: Number(stageNumber),
      },
    });
  }, [stage, stageNumber]);

  return stage

}

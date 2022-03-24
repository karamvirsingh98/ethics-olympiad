import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../main";
import { getDefaultFullScore } from "../../util/defaults";
import useJudgeName from "./useJudgeName";

// export function useScores() {
//   const [scores, set] = useState();
//   const { eventID } = useParams();
//   const { judgeName } = useJudgeName();

//   useEffect(() => {
//     client.service("api/scores").find({ eventID, judgeName }).then(set);
//   }, []);

//   return { scores };
// }

export function useScore() {
  const { judgeName } = useJudgeName();
  const { eventID, heatNumber } = useParams();
  const [score, set] = useState(
    getDefaultFullScore(judgeName!, eventID!, Number(heatNumber))
  );

  return {
    score,
    set,
    updateScore: (field: string, newScore: number, teamA: boolean) => {
      if (teamA) {
        set({ ...score, scoreA: { ...score.scoreA, [field]: newScore } });
      } else set({ ...score, scoreB: { ...score.scoreB, [field]: newScore } });
    },
  };
}

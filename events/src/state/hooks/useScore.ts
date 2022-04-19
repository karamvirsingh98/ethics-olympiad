import { useState } from "react";
import { useParams } from "react-router-dom";
import { useJudgeName } from "../../App";
import { getDefaultFullScore } from "../../util/defaults";

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
    toggleHonorable: (teamA: boolean) => () => {
      set(
        teamA
          ? { ...score, honorableA: !score.honorableA }
          : { ...score, honorableB: !score.honorableB }
      );
    },
  };
}

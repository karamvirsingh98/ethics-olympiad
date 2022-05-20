import useActiveStage from "../../../state/hooks/useActiveStage";
import { usePadQuestion } from "../../../util/hooks";
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
  const stage = useActiveStage();
  const { heightRef, pad } = usePadQuestion();

  const fontSize = question.length < 150 ? "3.5rem" : "3rem";

  return (
    <div className="stage">
      {<RoundTracker stage={stage} showButtons />}
      <div className="stage-content">
        <div
          style={{
            fontSize,
            maxHeight: "70vh",
            overflow: "auto",
            paddingRight: pad ? "0.5rem" : undefined,
          }}
          id="question"
          ref={heightRef}
        >
          {question}
        </div>
        <Timer duration={timers[stage - 1]} />
      </div>
    </div>
  );
}

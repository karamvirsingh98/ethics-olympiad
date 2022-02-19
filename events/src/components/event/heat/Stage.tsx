import useActiveStage from "../../../state/hooks/useActiveStage";
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
  const stage = useActiveStage()

  return (
    <div className="stage">
      {<RoundTracker stage={stage} showButtons />}
      <div className="stage-content">
        <div style={{ fontSize: "3.5rem" }}>{question}</div>
        <Timer duration={timers[stage - 1]} />
      </div>
    </div>
  );
}

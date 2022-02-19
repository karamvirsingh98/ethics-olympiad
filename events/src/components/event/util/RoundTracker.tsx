import { useParams } from "react-router-dom";
import useStage from "../../../state/hooks/useStage";
import IfElse from "../../util/IfElse";

const arr = [
  "Discussion",
  "Presentation",
  "Discussion",
  "Commentary",
  "Discussion",
  "Response",
  "Judge Q&A",
];

export default function RoundTracker({ stage, showButtons }: { stage: number, showButtons?: boolean }) {
  const { navigate, next, back } = useStage(stage)
  const { roundNumber } = useParams()

  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        placeSelf: "center",
        placeItems: "center",
        maxWidth: "100%",
        gap: "2rem",
      }}
    >
      {showButtons && (
        <button className="blue" onClick={back} style={{ placeSelf: "end" }}>
          Back
        </button>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {arr.map((t, i) => (
          <Circle
            key={i}
            text={t}
            current={stage === i + 1}
            active={stage >= i + 1}
          />
        ))}
      </div>
      {showButtons && (
        <IfElse
          showIf={stage === 7}
          showTrue={
            <IfElse
              showIf={roundNumber === "1"}
              showTrue={
                <button
                  className="green"
                  onClick={() => navigate("../../round2")}
                  style={{ placeSelf: "end start" }}
                >
                  Next Round
                </button>
              }
              showFalse={
                <button
                  className="orange"
                  onClick={() => navigate("../../../")}
                  style={{ placeSelf: "end start" }}
                >
                  End Heat
                </button>
              }
            />
          }
          showFalse={
            <button
              className="blue"
              onClick={next}
              style={{ placeSelf: "end start" }}
            >
              Next
            </button>
          }
        />
      )}
    </div>
  );
}

function Circle({
  text,
  current,
  active,
}: {
  text: string;
  current: boolean;
  active: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        height: "fit-content",
        placeItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          opacity: current ? 1 : 0,
          fontSize: "1.25rem",
          transition: "opacity 500ms ease-out",
        }}
      >
        {text}
      </div>
      <div
        style={{
          width: "1.25rem",
          height: "1.25rem",
          borderRadius: "100%",
          backgroundColor: active ? "#C297B8" : undefined,
          transition: "background-color 1s ease-in-out",
          border: "solid 0.25rem #C297B8",
        }}
      />
    </div>
  );
}

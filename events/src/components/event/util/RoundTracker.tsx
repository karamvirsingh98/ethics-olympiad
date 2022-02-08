import { useNavigate } from "react-router-dom";

const arr = [
  "Discussion",
  "Presentation",
  "Discussion",
  "Commentary",
  "Discussion",
  "Response",
  "Judge Q&A",
];

export default function RoundTracker({ stage }: { stage: number }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "75%",
        placeSelf: "center",
      }}
    >
      <button
        className="blue"
        onClick={() => navigate(`../stage${stage === 1 ? 7 : stage - 1}`)}
        style={{ placeSelf: "end" }}
      >
        Back
      </button>
      {arr.map((t, i) => (
        <Circle
          key={t}
          text={t}
          current={stage === i + 1}
          active={stage >= i + 1}
        />
      ))}
      <button
        className="blue"
        onClick={() => navigate(`../stage${stage === 7 ? 1 : stage + 1}`)}
        style={{ placeSelf: "end" }}
      >
        Next
      </button>
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
          transition: "opacity 500ms ease",
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
          transition: "background-color 1s ease",
          border: "solid 0.25rem #C297B8",
        }}
      />
    </div>
  );
}
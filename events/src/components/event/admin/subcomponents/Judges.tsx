import RoundTracker from "../../util/RoundTracker";

export default function Judges({
  judges,
}: {
  judges: {
    [key: string]: {
      heatNumber: number;
      roundNumber: number;
      stageNumber: number;
    };
  };
}) {
  const names = Object.keys(judges);

  return (
    <div>
      {names.map((name) => (
        <div style={{ display: "grid", gap: "1rem" }} key={name}>
          <div style={{ fontSize: "2rem" }}> {name} </div>
          <RoundTracker stage={judges[name].stageNumber} />
        </div>
      ))}
    </div>
  );
}

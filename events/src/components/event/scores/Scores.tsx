export default function Scores() {
  return <div className="scores"></div>;
}

function ScoreDots({
  numDots,
  selected,
  onSelect,
}: {
  numDots: number;
  selected: number;
  onSelect: (selected: number) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {Array.from(new Array(numDots)).map((_, i) => (
          <div
            style={{
              width: "1rem",
              height: "1rem",
              borderRadius: "100%",
              backgroundColor: selected <= i + 1 ? "#C297B8" : undefined,
              transition: "background-color 1s ease-in-out",
              border: "solid 0.25rem #C297B8",
            }}
            onClick={() => onSelect(i + 1)}
          />
        ))}
      </div>
      <div> {selected} </div>
    </div>
  );
}

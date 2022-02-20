export default function ScoreDots({
  label,
  description,
  numDots,
  selected,
  onSelect,
}: {
  label: string;
  description: string;
  numDots: number;
  selected: number;
  onSelect: (selected: number) => void;
}) {

  function capitalise(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div style={{ display: "grid", gap: '1rem' }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "1.25rem" }}> {capitalise(label)} </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div onClick={() => onSelect(0)} style={{ cursor: "pointer" }}>
              X
            </div>
            {Array.from(new Array(numDots)).map((_, i) => (
              <div
                key={i}
                style={{
                  cursor: "pointer",
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "100%",
                  backgroundColor: selected >= i + 1 ? "#C297B8" : "grey",
                  transition: "background-color 250ms ease-in-out",
                  // border: "solid 0.25rem #C297B8",
                }}
                onClick={() => onSelect(i + 1)}
              />
            ))}
          </div>
          <div>
            {selected} / {numDots}
          </div>
        </div>
      </div>
      <div> {description} </div>
    </div>
  );
}


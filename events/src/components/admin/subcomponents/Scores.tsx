import { ScoreStatus } from "@ethics-olympiad/types";
import check from "../../../assets/icons/check.svg";
import cross from "../../../assets/icons/cross.svg";

export default function SocoreStatusComponent({
  scores,
  numHeats,
}: {
  scores: ScoreStatus;
  numHeats: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        height: "fit-content",
        maxHeight: "80vh",
        overflowY: "scroll",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "2rem",
        }}
      >
        {Object.keys(scores).length > 0 &&
          Array.from(new Array(numHeats)).map((_, i) => (
            <div
              style={{ width: "4rem", display: "grid", placeItems: "center" }}
            >
              Heat {i + 1}
            </div>
          ))}
      </div>
      {Object.keys(scores).map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>{name}</div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {Array.from(new Array(numHeats)).map((_, i) => (
              <div
                style={{ width: "4rem", display: "grid", placeItems: "center" }}
              >
                <img
                  src={i < scores[name] ? check : cross}
                  alt={i < scores[name] ? "yes" : "no"}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

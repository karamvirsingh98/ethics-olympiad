import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Flip() {
  const [flipping, set] = useState(false);
  const [res, setRes] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (flipping)
      setTimeout(() => {
        set(false);
        setRes(Math.random() > 0.5 ? "HEADS" : "TAILS");
      }, 2000);
  }, [flipping]);

  return (
    <div
      style={{
        placeSelf: "center",
        display: "grid",
        placeItems: "center",
        gap: "2rem",
        gridTemplateRows: "1fr auto",
      }}
    >
      <div
        style={{ width: "10rem", height: "10rem" }}
        className={flipping ? "rise" : undefined}
      >
        <div
          className={`coin ${flipping ? "flipping" : ""}`}
          style={{
            transform: flipping ? "translateY(-100%)" : "translateY(0%)",
            transition: "transform 2s ease",
          }}
        >
          <div className="coin-inner">
            {res}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        {res && (
          <button
            className="orange"
            onClick={() => setRes(undefined)}
            style={{
              fontSize: "0.8rem",
              padding: "0.25rem 1rem",
              placeSelf: "end",
            }}
          >
            Reset
          </button>
        )}
        <button
          className="green"
          onClick={() => (res ? navigate("../round1") : set(true))}
          style={{ fontSize: "1.5rem", padding: "0.25rem 1rem" }}
        >
          {res ? "Start Heat" : "Flip The Coin! "}
        </button>
      </div>
    </div>
  );
}

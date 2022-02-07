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
        gap: "2rem",
        placeItems: "center",
        gridTemplateRows: "1fr 1fr"
      }}
    >
      <div
        style={{ width: "fit-content", height: "fit-content" }}
        className={flipping ? "rise" : undefined}
      >
        <div
          className={`coin ${flipping ? "flipping" : ""}`}
          style={{
            transform: flipping ? "translateY(-100%)" : "translateY(0%)",
            transition: "transform 2s ease",
          }}
          onClick={() => set(true)}
        >
          {res}
        </div>
      </div>
      {res && (
        <button className="green" onClick={() => navigate("./round1")}>
          Start Heat
        </button>
      )}
    </div>
  );
}

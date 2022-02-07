import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IfElse from "../../util/IfElse";

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
        gridTemplateRows: "1fr 1fr",
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
        >
          {res}
        </div>
      </div>
      <button
        className="green"
        onClick={() => (res ? navigate("../round1") : set(true))}
        style={{ fontSize: "1.5rem", padding: "0.25rem 1rem" }}
      >
        {res ? "Start Heat" : "Flip Coin"}
      </button>
    </div>
  );
}

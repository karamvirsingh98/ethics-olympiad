import { useNavigate } from "react-router-dom";
import imgUrl from "../assets/hero.png";

export default function Home() {
  const navigate = useNavigate();

  const buttonStyle = { padding: "1rem", fontSize: "2rem", width: "100%" };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        placeItems: "center",
        height: "100%",
      }}
    >
      <img src={imgUrl} alt="" style={{ height: "50vh" }} />
      <div
        style={{
          display: "grid",
          gap: "2rem",
          placeItems: "center stretch",
          width: "100%",
          paddingRight: "2rem",
        }}
      >
        <button
          className="blue"
          style={buttonStyle}
          onClick={() => navigate("/events")}
        >
          Your Events
        </button>
        <button
          className="blue"
          style={buttonStyle}
          onClick={() => navigate("/cases")}
        >
          Your Cases
        </button>
      </div>
    </div>
  );
}

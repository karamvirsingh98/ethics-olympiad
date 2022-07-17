import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src={hero} alt="" className="home-hero" />
      <div className="home-content">
        <button
          className="blue home-button"
          onClick={() => navigate("/events")}
        >
          Your Events
        </button>
        <button className="blue home-button" onClick={() => navigate("/cases")}>
          Your Cases
        </button>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { client } from "../../../main";

export function StartButton({
  eventID,
  navigate,
}: {
  eventID: string;
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <button
      style={{ placeSelf: "center", fontSize: "2rem" }}
      className="green"
      onClick={async () => {
        await client.service("api/active").create({ eventID })
        navigate("./admin")
      }}
    >
      Start Event
    </button>
  );
}

export function AdminButtons({
  showScores,
  setShowScores,
  eventID,
}: {
  showScores: boolean;
  setShowScores: (scores: boolean) => void;
  eventID: string;
}) {
  const navigate = useNavigate()

  return (
    <div style={{ display: "flex", gap: "2rem", placeSelf: "end" }}>
      <button className="blue" onClick={() => setShowScores(!showScores)}>
        {" "}
        Show {showScores ? "Heat Progress" : "Score Submissions"}{" "}
      </button>
      <button
        className="green"
        onClick={() => client.service("api/active").create({ eventID })}
      >
        Reset Event
      </button>

      <button
        className="red"
        onClick={() => {
          client.service("api/active").remove(eventID)
          navigate("..")
        }}
      >
        End Event
      </button>
    </div>
  );
}

import { client } from "../../../main";

export function StartButton({ eventID }: { eventID: string }) {
  return (
    <button
      style={{ placeSelf: "center", fontSize: "2rem" }}
      className="green"
      onClick={() => client.service("api/active").create({ eventID })}
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
        onClick={() => client.service("api/active").remove(eventID)}
      >
        End Event
      </button>
    </div>
  );
}

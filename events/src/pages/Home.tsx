import ArrayMap from "../components/util/ArrayMap";
import BaseEventComponent from "../components/home/BaseEvent";
import useBaseEvents from "../state/hooks/useBaseEvents";
import useJudgeName from "../state/hooks/useJudgeName";

export default function Home() {
  const { events, templates } = useBaseEvents();
  const { name } = useJudgeName();

  return (
    <div className="home">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "4rem",
        }}
      >
        <div style={{ fontSize: "2rem" }}> Ethics Olympiad Events </div>
        <div> {name ? "logged in as " + name : ""} </div>
      </div>
      <div className="events">
        <ArrayMap
          array={events}
          map={(event) => <BaseEventComponent key={event._id} event={event} />}
        />
      </div>
    </div>
  );
}

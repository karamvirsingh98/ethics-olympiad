import ArrayMap from "../util/ArrayMap";
import BaseEventComponent from "../event/BaseEvent";
import useBaseEvents from "../../state/hooks/useBaseEvents";

export default function Home() {
  const events = useBaseEvents()
  return (
    <div className="home">
      <div style={{ fontSize: "2rem" }}> Ethics Olympiad </div>
      <div className="events">
        <ArrayMap
          array={events}
          map={(event) => <BaseEventComponent key={event._id} event={event} />}
        />
      </div>
    </div>
  );
}
import ArrayMap from "../components/util/ArrayMap";
import BaseEventComponent from "../components/home/BaseEvent";
import useBaseEvents from "../state/hooks/useBaseEvents";
import useJudgeName from "../state/hooks/useJudgeName";
import { useMemo, useState } from "react";

export default function Home() {
  const { events, templates } = useBaseEvents();
  const { name } = useJudgeName();
  const [filter, set] = useState("");

  const displayedEvents = useMemo(
    () =>
      events
        .filter((e) => e.eventTitle)
        .reverse()
        .filter((e) =>
          filter ? e.eventTitle.toLowerCase().includes(filter) : e
        ),
    [events, filter]
  );

  console.log(displayedEvents, filter);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        placeItems: "center",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      <div style={{ display: "grid", placeItems: "center", fontSize: "10vw" }}>
        Ethics Olympiad Events
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          height: "fit-content",
          width: "75%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <h1>Search: </h1>
          <input
            placeholder="Enter Event Name"
            style={{
              height: "fit-content",
              fontSize: "1.5rem",
            }}
            onChange={(e) => set(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "grid",
            gap: "2rem",
            height: "50vh",
            overflowY: "scroll",
            paddingRight: "1rem",
          }}
        >
          {events.length ? (
            <ArrayMap
              array={displayedEvents}
              map={(event) => (
                <BaseEventComponent key={event._id} event={event} />
              )}
            />
          ) : (
            <div className="spinner" />
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Items from "../components/Items";
import { AppState } from "../state/types";

export default function Events({ state }: { state: AppState }) {
  const [currentID, setID] = useState<string>();
  const { events,  } = state;

  return (
    <div className="page">
      <div className="page-title">
        Haboda Skeepoda Ethics Olympiad
      </div>
      <div className="page-content">
        <div style={{ borderRight: "solid 1px"}}>
          // events[current]
        </div>
        {events && <Items items={events} setCurrentID={setID} />}
      </div>
    </div>
  );
}
import { EventStatus } from "@ethics-olympiad/types";
import RoundTracker from "../../event/util/RoundTracker";
import ObjectMap from "../../util/ObjectMap";

export default function Judges({ judges }: { judges: EventStatus }) {
  const names = Object.keys(judges);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "70vh" }}>
      <ObjectMap
        object={judges}
        map={(name) => (
          <div
            style={{
              display: "grid",
              gap: "1rem",
              alignItems: "center",
              overflowX: "scroll",
              paddingBottom: "1rem",
            }}
            key={name}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ fontSize: "2rem" }}> {name} </div>
              <div style={{ flexWrap: "nowrap" }}>
                Heat {judges[name].heatNumber}, Round {judges[name].roundNumber}
              </div>
            </div>
            <RoundTracker stage={judges[name].stageNumber} />
          </div>
        )}
      />
    </div>
  );
}

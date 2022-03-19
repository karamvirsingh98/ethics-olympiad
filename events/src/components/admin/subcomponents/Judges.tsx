import { EventStatus } from "@ethics-olympiad/types";
import RoundTracker from "../../event/util/RoundTracker";
import ObjectMap from "../../util/ObjectMap";

export default function Judges({ judges }: { judges: EventStatus }) {
  const names = Object.keys(judges);

  return (
    <div>
      <ObjectMap
        object={judges}
        map={(name) => (
          <div style={{ display: "grid", gap: "1rem" }} key={name}>
            <div style={{ fontSize: "2rem" }}> {name} </div>
            <RoundTracker stage={judges[name].stageNumber} />
            <div> Heat {judges[name].heatNumber}, Round {judges[name].roundNumber} </div>
          </div>
        )}
      />
    </div>
  );
}

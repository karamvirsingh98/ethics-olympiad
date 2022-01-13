import { Cases, Event } from "../../state/types";
import AssignedCases from "./subcomponents/AssignedCases";
import Timers from "./subcomponents/Timers";

export default function EventCompnent({event, cases}:{event: Event, cases: Cases}) {
  return (
    <div className="event">
      <AssignedCases cases={cases} heats={event.heats} />
      <div style={{ borderLeft: "solid 1px", display: 'grid', placeItems: 'center' }}>
        Number of Heats
        <Timers />
      </div>
    </div>
  )
}
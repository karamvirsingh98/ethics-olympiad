import { BaseEvent } from "../../state/types";

export default function BaseEventComponent({ event }: { event: BaseEvent }) {
  return (
    <div>
      <div> {event.title} </div>
    </div>
  )
}

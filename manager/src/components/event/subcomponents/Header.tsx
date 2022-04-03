import TitleButtons from "./TitleButtons";
import ToggleInput from "../../util/ToggleInput";
import { Events } from "../../../state/types";
import { titleHelpers } from "../../../pages/helpers";

type Props = {
  editing: boolean;
  eventID: string;
  events: Events;
  setTitle: (name: string) => void;
  toggleEditing: () => void;
} & ReturnType<typeof titleHelpers>;

export default function EventHeader({
  editing,
  eventID,
  events,
  setTitle,
  setPassword,
  toggleEditing,
  deleteEvent,
  saveEdits,
  cancelEdits,
  getTitle,
}: Props) {
  return (
    <div className="page-title">
      <div style={{ display: "grid", gap: "1rem", width: "100%" }}>
        <div style={{ display: "flex", gap: "1rem", fontSize: "1.75rem" }}>
          Name:
          <ToggleInput
            id="event-title"
            editing={editing}
            value={getTitle()}
            fontSize="1.75rem"
            onEdit={setTitle}
            placeholder="Name This Event"
          />
        </div>
        <Password {...{ editing, eventID, events, setPassword }} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          width: "100%",
          placeSelf: "start",
          gap: "2rem",
        }}
      >
        <TitleButtons
          {...{
            editing,
            toggleEditing,
            onDelete: deleteEvent,
            onSave: saveEdits,
            onCancel: cancelEdits,
          }}
          extraText="Event"
        />
      </div>
    </div>
  );
}

function Password({
  editing,
  eventID,
  events,
  setPassword,
}: Pick<Props, "editing" | "eventID" | "events" | "setPassword">) {
  return (
    <div
      style={{
        placeSelf: "start",
        display: "flex",
        alignItems: "flex-end",
        fontSize: "1rem",
        gap: "1rem",
      }}
    >
      <div
        style={{
          borderBottom: "solid 0.25rem transparent",
          display: "flex",
        }}
      >
        Password:
        <div style={{ opacity: 0.5, marginLeft: "0.5rem" }}>
          {!editing && !events[eventID].password && "Create A Password"}
        </div>
      </div>
      <ToggleInput
        placeholder="enter password"
        editing={editing}
        value={events[eventID].password}
        onEdit={setPassword(eventID)}
      />
    </div>
  );
}

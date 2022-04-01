import { client } from "../main";
import { RemoveOne, SetOne, SetOneField } from "../state/hooks/useCollection";
import { Events } from "../state/types";
import { Event } from "@ethics-olympiad/types";
import { useNavigate } from "react-router-dom";

export function eventsHelpers(
  eventID: string,
  events: Events,
  setOne: SetOne<Event>,
  setOneField: SetOneField<Event>,
  removeOne: RemoveOne,
  setEditing: (editing: boolean) => void
) {
  const navigate = useNavigate();

  const deleteEvent = async () => {
    await client.service("api/events").remove(eventID);
    navigate(`/events/${events[eventID].templateID}`);
    removeOne(eventID);
  };

  const saveEdits = async () => {
    const updatedEvent = await client
      .service("api/events")
      .update(eventID, events![eventID]);
    setOne(eventID, updatedEvent);
    setEditing(false);
  };

  const cancelEdits = async () => {
    setOne(eventID, await client.service("/api/events").get(eventID));
    setEditing(false);
  };

  const getTitle = () =>
    events
      ? events[eventID]
        ? events[eventID].eventTitle
        : Object.keys(events).length > 0
        ? "Select an Event"
        : "Create an Event"
      : "Failed to Load Events";

  const setTitle = (title: string) => {
    setOneField(eventID, "eventTitle", title);
  };

  const setPassword = (id: string) => (password: string) => {
    setOneField(id, "password", password);
  };

  return {
    deleteEvent,
    saveEdits,
    cancelEdits,
    getTitle,
    setTitle,
    setPassword,
  };
}

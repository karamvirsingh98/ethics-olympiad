import { client } from "..";
import { getDefaultEvent } from "../state/defaults";
import { RemoveOne, SetOne, SetOneField } from "../state/hooks/useCollection";
import { Event, Events } from "../state/types";

export function eventsHelpers(
  userID: string,
  currentID: string,
  events: Events,
  setOne: SetOne<Event>,
  setOneField: SetOneField<Event>,
  removeOne: RemoveOne,
  setID: (id: string) => void,
  setEditing: (editing: boolean) => void
) {
  const createEvent = async () => {
    const newEvent: Event = await client
      .service("/api/events")
      .create(getDefaultEvent(userID));
    setOne(newEvent._id!, newEvent);
    setID(newEvent._id!);
    setEditing(true);
    document.getElementById("event-title")?.focus();
  };

  const deleteEvent = async () => {
    await client.service("api/events").remove(currentID);
    removeOne(currentID);
    setID("");
  };

  const saveEdits = async () => {
    const updatedEvent = await client
      .service("api/events")
      .update(currentID, events![currentID]);
    setOne(currentID, updatedEvent);
    setEditing(false);
  };

  const cancelEdits = async () => {
    setOne(currentID, await client.service("/api/events").get(currentID));
    setEditing(false);
  };

  const getTitle = () =>
    events
      ? events[currentID]
        ? events[currentID].title
        : Object.keys(events).length > 0
        ? "Select an Event"
        : "Create an Event"
      : "Failed to Load Events";

  const setTitle = (title: string) => {
    setOneField(currentID, "title", title);
  };

  const setPassword = (id: string) => (password: string) => {
    setOneField(id, "password", password);
  };

  return {
    createEvent,
    deleteEvent,
    saveEdits,
    cancelEdits,
    getTitle,
    setTitle,
    setPassword,
  };
}

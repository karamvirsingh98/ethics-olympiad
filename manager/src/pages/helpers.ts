import { client } from "../main";
import { CollectionFunctions } from "../state/hooks/useCollection";
import { Event } from "@ethics-olympiad/types";
import { useNavigate } from "react-router-dom";

export function titleHelpers(
  editing: boolean,
  event: Event,
  functions: CollectionFunctions<Event>,
  setEditing: (editing: boolean) => void
) {
  const navigate = useNavigate();
  const { setOne, setOneField, removeOne } = functions;
  const eventID = event._id!;

  const deleteEvent = () => {
    client.service("api/events").remove(eventID);
    navigate(`/events/${event.templateID}`);
    removeOne(eventID);
  };

  const saveEdits = async () => {
    const updatedEvent = await client
      .service("api/events")
      .update(eventID, event);
    setOne(eventID, updatedEvent);
    setEditing(false);
  };

  const cancelEdits = async () => {
    const unedited: Event = await client.service("/api/events").get(eventID);
    if (!unedited.eventTitle && !unedited.teams.length) {
      deleteEvent();
      setEditing(false);
    } else {
      setOne(eventID, unedited);
      setEditing(false);
    }
  };

  const getTitle = () => {
    if (editing) return event.eventTitle || "";
    else return event.eventTitle || "Unnamed Template";
  };

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
